import Axios from "axios";
import Header from "./Components/header/header";
import { useEffect, useState } from "react";
import Card from "./Components/Carta/card";
import css from "./app.module.scss";
import { URL_POKEMON } from "./Components/apidata/ApiRest";
import * as FaIcons from "react-icons/fa";

function App() {
  const [ArrayPokemon, setArrayPokemon] = useState([]);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [search, setSearch] = useState('');


  useEffect(() => {
    const api = async () => {
      const limit = 15;
      const xp = (xpage - 1) * limit;
      const apiPoke = await Axios.get(
        `${URL_POKEMON}?offset=${xp}&limit=${limit}`
      );

      setArrayPokemon(apiPoke?.data?.results);
    };

    api();
    getGlobalPokemon();
  }, [xpage]);

  const getGlobalPokemon = async () => {
    const res = await Axios.get(`${URL_POKEMON}?offset=0&limit=1000`);

    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });

    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  const filterPokemons = search?.length > 0
  ? globalPokemon.filter((pokemon) => pokemon?.name?.includes(search))
  : ArrayPokemon;

  const obtenerSearch = (e) =>{
    const texto = e.toLowerCase()
    setSearch(texto)
    setXpage(1)
  }

  return (
    <div>
      <Header obtenerSearch={obtenerSearch} />

      <section className={css.section_paginacion}>
        <div className={css.div_paginacion}>
          <span
            className={css.item_izquierdo}
            onClick={() => {
              if (xpage === 1) {
                return console.log("no puedo retroceder");
              }
              setXpage(xpage - 1);
            }}
          >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {xpage} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}>
            {""}
            {Math.round(globalPokemon?.length / 15)}{" "}
          </span>
          <span
            className={css.item_derecho}
            onClick={() => {
              if (xpage === 67) {
                return console.log("es el ultimo");
              }
              setXpage(xpage + 1);
            }}
          >
            {" "}
            <FaIcons.FaAngleRight />
            {""}
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {filterPokemons.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}

export default App;
