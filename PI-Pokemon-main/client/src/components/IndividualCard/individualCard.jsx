import React from "react";
import { Link } from "react-router-dom";
import styles from "../IndividualCard/IndividualCard.module.scss";

export function IndividualCard({ image, name, types, id }) {
  return (
    <div key={id} className={styles.container}>
      <Link to={`/home/${id}`}>
        <img className={styles.image} src={image} alt={name} />

        <div className={styles.detail}>
          <span className={styles.text}> {name?.toLocaleUpperCase()}</span>
          <span className={styles.text2}>Types:</span>
          <div className={styles.type}>
            {types.map((e) => (
              <span className={styles.text3} key={e}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
