import React from "react";
import { Link } from "react-router-dom";
import styles from "../HomePage/Home.module.scss";
export function Home() {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <Link to="/">Casa</Link>
      <Link to="/create">Crear</Link>
      <Link to="/home/:id">Detalles</Link>
    </div>
  );
}
