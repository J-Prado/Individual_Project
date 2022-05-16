import React from "react";
import styles from "../LandingPage/LandingPage.module.scss";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.tittle}
          src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png"
          alt="Tittle"
        />
        <Link to="/home">
          <button className={styles.button}>
            <span>PRESS HERE</span>
          </button>
        </Link>
      </div>
    </>
  );
}
