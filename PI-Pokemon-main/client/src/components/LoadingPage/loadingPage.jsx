import React from "react";
import styles from "../LoadingPage/LoadingPage.module.scss";

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <span className={styles.load}>L</span>
      <span className={styles.load}>O</span>
      <span className={styles.load}>A</span>
      <span className={styles.load}>D</span>
      <span className={styles.load}>I</span>
      <span className={styles.load}>N</span>
      <span className={styles.load}>G</span>
    </div>
  );
}
