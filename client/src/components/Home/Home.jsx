import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllDogs,
  getTemperament,
  filterDogsbyTemperament,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../../actions";
import style from "../Home/Home.module.css";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); // con useSelector guardame en allDogs todo lo que esta en el estado de dogs
  const allTemps = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1); //estado local con la primer pagina que se renderiza
  const [dogsForPage, setDogsForPage] = useState(8); // estado local con la cantidad de perros que quiero por pagina
  const indexLastDog = currentPage * dogsForPage; // 16
  const indexFirstDog = indexLastDog - dogsForPage; // 8
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

  const paginated = (pageNumber) => {
    // me ayuda con el renderizado
    setCurrentPage(pageNumber);
  };

  const [orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(getAllDogs()); //despachamos la accion que devuelve todos los perros
    dispatch(getTemperament()); //despachamos la accion que devuelve todos los temperamentos
  }, [dispatch]);

  function handleFilterByTemperament(e) {
    e.preventDefault();
    dispatch(filterDogsbyTemperament(e.target.value)); //toma como payload el value que elige el usuario
    // setName(e.target.value)
    //setCurrentPage(1)
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    //setCurrentPage(1)
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //cuando hago el ordenamiento seteo la pagina en 1 -> pagina principal
    setOrden(`Sorted ${e.target.value}`); // modifico el estado local para que el front haga el ordenamiento
  } // empieza en estado local vacio y lo modifico/seteo para que se renderize ordenado de tal forma

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Sorted ${e.target.value}`);
  }

  return (
    <div className={style.home}>
      <NavBar />

      <h1 className={style.title}>Welcome to Dog World</h1>

      <SearchBar />
      {/*------- ORDEN ALFABETICO----- */}
      <select
        onChange={(e) => {
          handleOrderByName(e);
        }}
      >
        <option hidden>ORDER ALPHABETICALLY</option>
        <option value="ascendente">A-Z</option>
        <option value="descendente">Z-A</option>
      </select>
      {/*------- ORDEN POR PESO----- */}
      <select
        onChange={(e) => {
          handleOrderByWeight(e);
        }}
      >
        <option hidden>ORDER BY WEIGHT</option>
        <option value="weightMin">Min weight</option>
        <option value="weightMax">Max weight</option>
      </select>
      {/*-------FILTRADO TEMP----- */}
      <select
        onChange={(e) => {
          handleFilterByTemperament(e);
        }}
      >
        <option hidden>FILTER BY TEMPERAMENT</option>

        {allTemps &&
          allTemps.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
      </select>
      {/*--------FILTRADO CREATE---- */}
      <select
        onChange={(e) => {
          handleFilterCreated(e);
        }}
      >
        <option hidden>FILTER BY CREATION</option>
        <option value="all">All</option>
        <option value="api">Existing</option>
        <option value="dataBase">Created</option>
      </select>

      <Paginated
        dogsForPage={dogsForPage}
        allDogs={allDogs.length} // .length xq necesito un valor numerico
        paginated={paginated}
        currentPage={currentPage}
      />

      <div className={style.homeCard}>
        {currentDogs &&
          currentDogs.map((d) => {
            return (
              <div className={style.link} key={d.id}>
                <Link to={`/dogs/${d.id}`} style={{ textDecoration: "none" }}>
                  <Card
                    key={d.id}
                    name={d.name}
                    weight={`${d.weightMin} - ${d.weightMax}`}
                    image={d.image}
                    temperament={
                      d.temperament || d.temperaments?.map((e) => e.name + " ")
                    }
                  />
                </Link>
              </div>
            );
          })}
      </div>
      {/* <Paginado
        dogsForPage={dogsForPage}
        allDogs={allDogs.length} // .length xq necesito un valor numerico
        paginado={paginado}
      /> */}
    </div>
  );
}
