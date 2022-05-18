import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../reactRedux/actions/index.js";

import styles from "../CharDetail/Detail.module.scss";
import LoadingPage from "../LoadingPage/loadingPage.jsx";

export function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailPoke = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getById(id));
    // return function cleanUp() {
    //   dispatch(getById("clear"));
    // };
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Link to="/home">
        <button>
          <img
            className={styles.pic}
            src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
            alt="Returning Home"
          />
        </button>
      </Link>

      {detailPoke ? (
        <div className={styles.container}>
          <h1>{detailPoke.name?.toLocaleUpperCase()}</h1>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={detailPoke.image}
              alt={detailPoke.name}
            />
            <div className={styles.details}>
              <p>Id: {detailPoke.id}</p>
              <p>Hp: {detailPoke.hp}</p>
              <p>Attack: {detailPoke.attack}</p>
              <p>Defense: {detailPoke.defense}</p>
              <p>Speed: {detailPoke.speed}</p>
              <p>Height: {detailPoke.height}</p>
              <p>Weight: {detailPoke.weight}</p>
              <p>Types:</p>
              {detailPoke.types?.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </React.Fragment>
  );
}
