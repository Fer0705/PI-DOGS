import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClean, getDetail } from "../../actions";
import style from "../DogDetail/DogDetail.module.css";

export default function DogDetail() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        <h1>{detail.name}</h1>
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
        <h2 style={{ color: "white", WebkitTextStroke: "1px black" }}>
          Temperaments:
        </h2>
        <br />
        <h2>
          {detail.temperament || detail.temperaments?.map((e) => e.name + " ")}
        </h2>
        <br />
        <h2 style={{ color: "white", WebkitTextStroke: "1px black" }}>
          Height:{" "}
        </h2>
        <br />
        <h2>{`${detail.heightMin} - ${detail.heightMax} Cm`}</h2>
        <br />
        <h2 style={{ color: "white", WebkitTextStroke: "1px black" }}>
          Weight:
        </h2>
        <br />
        <h2>{`${detail.weightMin} - ${detail.weightMax} Kg`}</h2>
        <br />
        <h2
          style={{
            color: "white",
            WebkitTextStroke: "1px black",
          }}
        >
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
