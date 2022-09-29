import React from "react";
import style from "../Card/Card.module.css";

export default function Card({ name, weight, image, temperament }) {
  return (
    
      <div className={style.card}>
        <h2>{name}</h2>
        <img src={image} alt="img dog" width="500px" height="350px" />
        <h4>{weight} kg</h4>
        <h4>{temperament}</h4>
        
      </div>
    
  );
}
