import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reactDom from "react-dom";
import { LocalSeeTwoTone } from "@material-ui/icons";
import axios from "axios";

// Configuración de interceptores de Axios
axios.interceptors.request.use((request) => {
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
});

/* ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
) */

/* COMENTARIO: Se elimina el React.StrictMode para que no tire error al tocar borrar en admin: LocalSeeTwoTone, usuarios, etc. */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
