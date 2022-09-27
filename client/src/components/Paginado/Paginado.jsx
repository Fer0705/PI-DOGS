/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({ allDogs, dogsForPage, paginado}) {
    const pageNumbers = []

    for(let i = 1 ; i <= Math.ceil(allDogs/dogsForPage); i++){
        pageNumbers.push(i)
    }   

return (
    <div className={style.position} >
        <ul className={style.paginado} >
            {pageNumbers && pageNumbers.map((n) => (
                <li className={style.num} key={n}>
                 <a onClick={() => paginado(n)}>{n}</a>
                </li>
            ))}
        </ul>
    </div>
)
}
