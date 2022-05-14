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
    return function cleanUp() {
      dispatch(getById("clear"));
    };
  }, [dispatch, id]);

  return (
    <React.Fragment>
      {detailPoke ? (
        <>
          <div>
            <div>
              <h1>{detailPoke.name}</h1>
              <img src={detailPoke.image} alt={detailPoke.name} />
              <p>Hp: {detailPoke.hp}</p>
              <p>Attack: {detailPoke.attack}</p>
              <p>Defense: {detailPoke.defense}</p>
              <p>Speed: {detailPoke.speed}</p>
              <p>Height: {detailPoke.height}</p>
              <p>Weight: {detailPoke.weight}</p>
              <p>Types: {detailPoke.types}</p>
              {(e) => (e = detailPoke.types.map((e) => <p> - {e}</p>))}
            </div>
            <div>
              <Link to="/home">
                <button>Back Home</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </React.Fragment>
  );
}
