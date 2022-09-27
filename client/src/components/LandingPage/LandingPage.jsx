import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";
//import logo from "../img/fondop.gif"

export default function LandingPage() {
  return (
    <div className="container">
      <h1 className="welcome">Welcome to Dog World</h1>

      <Link to="/home">
        <img
          className="footprint"
          src="https://us.123rf.com/450wm/ahasoft2000/ahasoft20001801/ahasoft2000180101464/92879719-icono-de-moneda-de-perro-paso-de-bronce-el-estilo-del-vector-es-un-s%C3%ADmbolo-de-moneda-plana-de-cobre-.jpg?ver=6"
          alt="bone"
          width="100px"
          height="100px"
        />
      </Link>
    </div>
  );
}
