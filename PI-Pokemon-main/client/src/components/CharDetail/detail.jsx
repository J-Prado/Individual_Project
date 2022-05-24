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
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Link to="/home">
        <div className={styles.picCont}>
          <button>
            <img
              className={styles.pic}
              src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
              alt="Returning Home"
            />
          </button>
        </div>
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
              <div>Id:</div>
              <span className={styles.content}>{detailPoke.id}</span>
              <div>Hp: </div>
              <span
                className={styles.content1}
                style={{ width: detailPoke.hp }}
              >
                {detailPoke.hp}
              </span>
              <div>Attack:</div>
              <span
                className={styles.content1}
                style={{ width: detailPoke.attack }}
              >
                {detailPoke.attack}
              </span>
              <div>Defense:</div>
              <span
                className={styles.content1}
                style={{ width: detailPoke.defense }}
              >
                {detailPoke.defense}
              </span>
              <div>Speed:</div>
              <span
                className={styles.content1}
                style={{ width: detailPoke.speed }}
              >
                {detailPoke.speed}
              </span>
              <div>Height:</div>
              <span>{detailPoke.height}</span>
              <div>Weight: </div>
              <span>{detailPoke.weight}</span>
              <div>Types:</div>
              {detailPoke.types?.map((e) => (
                <div key={e}>
                  * {e?.charAt(0).toLocaleUpperCase() + e?.slice(1)}
                </div>
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
