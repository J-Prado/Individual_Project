import React from "react";
import { Link } from "react-router-dom";
import styles from "../IndividualCard/IndividualCard.module.scss";

export function IndividualCard({ image, name, types, id }) {
  return (
    <div key={id}>
      <Link className={styles.link} to={`/home/${id}`}>
        <div className={styles.container}>
          <img className={styles.image} src={image} alt={name} />
        </div>
        <div className={styles.detail}>
          <p className={styles.text}>Name: {name}</p>
          Types:
          {types.map((e) => (
            <p className={styles.text} key={e}>
              {e}
            </p>
          ))}
        </div>
      </Link>
    </div>
  );
}
