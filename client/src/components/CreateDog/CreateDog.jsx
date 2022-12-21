import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postDog, getTemperament } from "../../actions";
import style from "../CreateDog/CreateDog.module.css";
import { validate } from "./validate";

export default function CreateDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory(); //metodo del router que me redirige a la ruta que yo le diga
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  function handleChange(e) {
    console.log(input);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input, //traeme lo que ya habia y concatenale el e.target.value --> agrega al arreglo todo lo que vaya seleccionando
      temperament: Array.from(new Set([...input.temperament, e.target.value])),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    if (Object.values(errors).length > 0) {
      alert("Please complete the required information");
    } else if (
      input.name === "" ||
      input.heightMin === "" ||
      input.heightMax === "" ||
      input.weightMin === "" ||
      input.weightMax === "" ||
      input.image === "" ||
      input.life_span === ""
    ) {
      alert("please complete all fields");
    } else {
      dispatch(postDog(input));
      alert("Dog successfully create");

      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperament: [],
      });
      history.push("/home");
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== e),
    });
  }

  return (
    <div className="createDog">
      <div>
        <h2 className={style.createDog}>Create your own dog</h2>
        <Link to="/home">
          <button className={style.back}>BACK HOME</button>
        </Link>
      </div>
      <div className={style.container}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          id="formCreate"
          className={style.formu}
        >
          <div className={style.name}>
            <label>Name: </label>
            <input
              onChange={handleChange}
              type="text"
              value={input.name}
              name="name"
              id="name"
              placeholder="Breed..."
              //required
            />
            {errors.name ? (
              <h4>
                <small>{errors.name}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* --------------------------------------------------------------- */}
          <div className={style.minHeight}>
            <label>Min height: </label>
            <input
              onChange={handleChange}
              type="text"
              value={input.heightMin}
              name="heightMin"
              id="heightMin"
              min="1"
              max="150"
              placeholder="expressed in cm"
              //required
            />
            {errors.heightMin ? (
              <h4>
                <small>{errors.heightMin}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* --------------------------------------------------------------- */}
          <div className={style.maxHeight}>
            <label>Max height: </label>
            <input
              onChange={handleChange}
              type="text"
              value={input.heightMax}
              name="heightMax"
              id="heightMax"
              min="1"
              max="150"
              placeholder="expressed in cm"
              //required
            />
            {errors.heightMax ? (
              <h4>
                <small>{errors.heightMax}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* ------------------------------------------------------------------- */}
          <div>
            <label>Min weight: </label>
            <input
              onChange={handleChange}
              type="text"
              value={input.weightMin}
              name="weightMin"
              id="weightMin"
              min="1"
              max="150"
              placeholder="expressed in kg"
              //required
            />
            {errors.weightMin ? (
              <h4>
                <small>{errors.weightMin}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* --------------------------------------------------------------------- */}
          <div>
            <label>Max weight: </label>
            <input
              onChange={handleChange}
              type="text"
              value={input.weightMax}
              name="weightMax"
              id="weightMax"
              min="1"
              max="150"
              placeholder="expressed in kg"
              //required
            />
            {errors.weightMax ? (
              <h4>
                <small>{errors.weightMax}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* ------------------------------------------------------------------------ */}
          <div>
            <label>Life span: </label>
            <input
              onChange={handleChange}
              type="text"
              value={input.life_span}
              name="life_span"
              id="life_span"
              placeholder="range expressed in years. (example: 8 - 13)"
              //required
            />
            {errors.life_span ? (
              <h4>
                <small>{errors.life_span}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* --------------------------------------------------------------------- */}
          <div>
            <label>Image:</label>
            <input
              onChange={handleChange}
              type="text"
              value={input.image}
              name="image"
              id="image"
              placeholder="URL..."
              //required
            />
            {errors.image ? (
              <h4>
                <small>{errors.image}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div>
            <label style={{ marginTop: "15px" }}>Temperaments:</label>
            <select
              onChange={(e) => handleSelect(e)}
              className={style.selecTemp}
            >
              <option hidden>choose the temperaments</option>
              {temperaments?.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {input.temperament.map((e) => (
              <div key={e} className={style.delete}>
                <div className={style.temp} key={e}>
                  {e}
                </div>
                {errors.temperament ? (
                  <h4>
                    <small>{errors.temperament}</small>
                  </h4>
                ) : (
                  false
                )}
                <button
                  className={style.deleteButton}
                  onClick={() => handleDelete(e)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className={style.butCreate}>
            CREATE DOG!
          </button>
        </form>
      </div>
    </div>
  );
}
