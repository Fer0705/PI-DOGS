import React from "react";
import { Link } from "react-router-dom";
import style from "../NavBar/NavBar.module.css";

export default function NavBar() {
  return (
    <div className={style.but}>
      <Link to="/">
        <button className={style.land}>BACK LANDING</button>
      </Link>

      <Link to="/dog">
        <button className={style.createDog}>CREATE DOG</button>
      </Link>
    </div>
  );
}
