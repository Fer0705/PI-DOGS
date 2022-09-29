import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName, getAllDogs } from "../../actions";

import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

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
            placeholder="Write the breed to search... "
          />
          <button
            className={style.searchBut}
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            SEARCH
          </button>

          <button
        className={style.refresh}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        REFRESH
      </button>
            
        </form>
      </nav>
    </div>
  );
}
