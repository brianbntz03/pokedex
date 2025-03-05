import React from "react";
import reactDom from "react-dom";
import App from "./src/App.js";
import "../src/components/styles/index.scss";

reactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);