import React from "react";
import styles from "../NotFound/NotFound.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <span className={styles.message}>
        We're sorry! What you are looking for has not been found.
      </span>
      <img
        className={styles.image}
        src="https://i.pinimg.com/originals/85/41/2f/85412f5e3d742cd9f5a68ece9e3af8bd.gif"
        alt="Not Found"
      />
    </div>
  );
}
