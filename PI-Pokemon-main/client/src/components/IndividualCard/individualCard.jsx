import React from "react";
import { Link } from "react-router-dom";
import styles from "../IndividualCard/IndividualCard.module.scss";

export function IndividualCard({ image, name, types, id }) {
  return (
    <div key={id} className={styles.container}>
      <Link to={`/home/${id}`}>
        <img
          className={styles.image}
          src={image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png";
          }}
          alt={name}
        />

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
