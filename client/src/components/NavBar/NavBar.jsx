import React from "react";
import { Link } from "react-router-dom";
import style from "../NavBar/NavBar.module.css";

export default function NavBar() {
  return (
    <div className={style.but}>
      {/* <Link to="/dog">
        <button className={style.createDog}>CREATE DOG</button>
      </Link> */}
      <Link to="/">
        <img
          className={style.logo}
          src="https://static.vecteezy.com/system/resources/previews/005/484/042/original/dog-logo-illustration-free-vector.jpg"
          alt="logo"
          width={70}
          height={70}
        />
      </Link>
    </div>
  );
}
