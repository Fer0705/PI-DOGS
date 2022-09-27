import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogName } from "../../actions";

import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value); // setea tomando el value del input
    console.log(e.target.value);
  }

  const form = document.getElementById("form");
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogName(name));
    
   form.reset();
  }

  return (
    <div>
      <nav>
        <form id="form">
          <input
            onChange={(e) => {
              handleInputChange(e);
            }}
            className={style.search}
            type="text"
            placeholder="Search..."
          />
          <button
            className={style.searchBut}
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            SEARCH
          </button>
            
        </form>
      </nav>
    </div>
  );
}
