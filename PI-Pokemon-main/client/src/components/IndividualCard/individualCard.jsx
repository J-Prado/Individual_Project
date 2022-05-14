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
          <span className={styles.text}>Name: {name}</span>
          Types:
          {types.map((e) => (
            <span className={styles.text} key={e}>
              {e}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
