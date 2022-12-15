import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClean, getDetail } from "../../actions";
import style from "../DogDetail/DogDetail.module.css";

export default function DogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getClean());
  }, [dispatch, id]);

  const detail = useSelector((state) => state.dogDetail);

  function handleClick(e) {
    e.preventDefault(e);
    history.push("/home");
  }

  return (
    <div className={style.cardDetail}>
      <h1>{detail.name}</h1>
      <img src={detail.image} alt="img dog" width="550px" height="350px" />
      <h2>
        {detail.temperament || detail.temperaments?.map((e) => e.name + " ")}
      </h2>
      <h2>Height: {`${detail.heightMin} - ${detail.heightMax} Cm`}</h2>
      <h2>Weight: {`${detail.weightMin} - ${detail.weightMax} Kg`}</h2>
      <h2>
        Life span:{" "}
        {detail.createDb ? `${detail.life_span}  years` : detail.life_span}
      </h2>
      {/* <h2>Creado Por: {detail.creadoPor}</h2> */}

      <button onClick={handleClick}>BACK HOME</button>
    </div>
  );
}
