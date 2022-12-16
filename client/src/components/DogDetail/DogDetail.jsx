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
    <div className={style.wrapper}>
      <div className="one">
        <br />
        <h1 style={{ fontSize: "3.5rem", marginLeft: "1px" }}>{detail.name}</h1>
        <br />
        <br />
        <img
          className={style.photo}
          src={detail.image}
          alt="img dog"
          width="650px"
          height="450px"
        />
      </div>
      <div className="two">
        <br />
        <br />
        <h2 style={{ color: "gray", textDecoration: "underline" }}>
          Temperaments:
        </h2>
        <br />
        <h2>
          {detail.temperament || detail.temperaments?.map((e) => e.name + " ")}
        </h2>
        <br />
        <h2 style={{ color: "gray", textDecoration: "underline" }}>Height: </h2>
        <br />
        <h2>{`${detail.heightMin} - ${detail.heightMax} Cm`}</h2>
        <br />
        <h2 style={{ color: "gray", textDecoration: "underline" }}>Weight:</h2>
        <br />
        <h2>{`${detail.weightMin} - ${detail.weightMax} Kg`}</h2>
        <br />
        <h2 style={{ color: "gray", textDecoration: "underline" }}>
          Life span:
        </h2>
        <br />
        <h2>
          {detail.createDb ? `${detail.life_span}  years` : detail.life_span}
        </h2>
        <br />
        <div>
          <br />
          <button className={style.back} onClick={handleClick}>
            BACK HOME
          </button>
        </div>
      </div>
    </div>
  );
}
