import React, { useState, useEffect } from "react";
import { get_types, postPokemon } from "../../reactRedux/actions/index.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../CreationPage/CreationPage.module.scss";

function validation(input) {
  let error = {};
  let nameRequired = /^[a-zA-Z]+$/;
  let number = /^[0-9]*[1-9][0-9]*$/;
  let url = /\.(gif|jpeg|jpg|png)$/i;
  let urlBegin = /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/;

  if (!input.name || input.name.length < 3) {
    error.name = "Name is required";
  } else if (!nameRequired.test(input.name)) {
    error.name = "Only letters are allowed";
  }

  if (!input.image) {
    error.image = "Import the url from an image.";
  } else if (!url.test(input.image) && !urlBegin.test(input.image)) {
    error.image = "A valid image file extension must be used.";
  }

  if (!input.hp || input === 0) {
    error.hp = "Fill this blank space.";
  } else if (!number.test(input.hp)) {
    error.hp = "Must be an integer and greater than 0";
  }

  if (!input.attack) {
    error.attack = "Fill this blank space.";
  } else if (!number.test(input.attack)) {
    error.attack = "Must be an integer and greater than 0";
  }

  if (!input.defense) {
    error.defense = "Fill this blank space.";
  } else if (!number.test(input.defense)) {
    error.defense = "Must be an integer and greater than 0";
  }

  if (!input.weight || input === 0) {
    error.weight = "Fill this blank space.";
  } else if (!number.test(input.weight)) {
    error.weight = "Must be an integer and greater than 0";
  }

  if (!input.hp || input === 0) {
    error.speed = "Fill this blank space.";
  } else if (!number.test(input.speed)) {
    error.speed = "Must be an integer and greater than 0";
  }

  if (!input.height || input === 0) {
    error.height = "Fill this blank space.";
  } else if (!number.test(input.height)) {
    error.height = "Must be an integer and greater than 0";
  }

  if (!input.types) {
    error.types = "Must select at least one option.";
  }
  console.log(error);
  return error;
}

export function CreationPage() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const [setInputCopy] = useState({ ...input });

  const handleChangeInput = (event) => {
    if (!isNaN(parseInt(event.target.value))) {
      setInput({
        ...input,
        [event.target.name]: Number(event.target.value),
      });
      setError(
        validation({
          ...input,
          [event.target.name]: Number(event.target.value),
        })
      );
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
    setError(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSelect = (event) => {
    setInput({
      ...input,
      types: [...input.types, event.target.value],
    });
    setError(
      validation({
        ...input,
        types: [...input.types, event.target.value],
      })
    );
    console.log(input.types);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation(error));
    if (!Object.keys(error)) {
      alert("All blank spaces must be filled to create your pokemon.");
    } else {
      if (!input.types) return setError("Select the pokemon type");
      else {
        alert("Sending the form to create your Pokemon.");
        dispatch(postPokemon(input));
        alert(
          "Congratulations! Your Pokemon was successfully created in your Data Base!."
        );
        setInput({
          name: "",
          image: "",
          hp: 0,
          attack: 0,
          defense: 0,
          speed: 0,
          height: 0,
          weight: 0,
          types: [],
        });

        setError(
          validation({
            ...input,
            errors: "",
          })
        );
      }
    }
  };
  const handleDeleteType = (event) => {
    event.preventDefault();
    const newInput = input.types.splice(event.target.value, 1);
    setInputCopy(newInput);
  };

  const pokeIdNam = (name) => {
    let findName = types.find((t) => t.name === name);
    if (findName) return findName.name;
  };

  useEffect(() => {
    dispatch(get_types());
  }, [dispatch]);

  return (
    <div className={styles.generalContainer}>
      <div className={styles.image3}>
        <img
          src="https://i.pinimg.com/originals/bc/c8/be/bcc8be0c6b5fa23fd06ac493878e3c3f.gif"
          alt="Creation Page"
        />
      </div>
      <div className={styles.imageCont}>
        <Link to="/home">
          <button>
            <img
              className={styles.image}
              src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
              alt="Returning Home"
            />
          </button>
        </Link>

        <img
          className={styles.image2}
          src="https://www.freepnglogos.com/uploads/gotta-catch-em-all-transparent-pokemon-logo-11.png"
          alt="Title"
        />
      </div>
      <h1 className={styles.tittle}>Create your Pokemon</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.space}>
          <input
            className={styles.input}
            type="text"
            value={input.name}
            name="name"
            placeholder="Enter the Pokemon Name"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Pokemon Name: </label>
          <div>{error.name && <p>{error.name}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.hp}
            placeholder="Enter the Pokemon Name"
            name="hp"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>HP: </label>
          <div>{error.hp && <p>{error.hp}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.attack}
            name="attack"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Attack: </label>
          <div> {error.attack && <p>{error.attack}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.defense}
            name="defense"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Defense: </label>
          <div>{error.defense && <p>{error.defense}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.speed}
            name="speed"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Speed: </label>
          <div>{error.speed && <p>{error.speed}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.weight}
            name="weight"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Weight: </label>
          <div>{error.weight && <p>{error.weight}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.height}
            name="height"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Height: </label>
          <div> {error.height && <p>{error.height}</p>}</div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            value={input.image}
            name="image"
            onChange={handleChangeInput}
          />
          <label className={styles.labels}>Image: </label>
          <div>{error.image && <p>{error.image}</p>}</div>
        </div>
        <div>
          <label className={styles.label}>Pokemon Type: </label>
          <select
            className={styles.select}
            key="select"
            onChange={handleSelect}
          >
            <option value="" disabled>
              Pokemon types
            </option>
            {types?.map((type) => (
              <option value={type.name} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <div>
            {input.types?.map((type) => (
              <div key={type}>
                <button className={styles.types} onClick={handleDeleteType}>
                  {pokeIdNam(type)}
                </button>
              </div>
            ))}
          </div>
          {error.types && <p>{error.types}</p>}
        </div>
        <button className={styles.button} type="submit">
          Create Pokemon
        </button>
      </form>
    </div>
  );
}
