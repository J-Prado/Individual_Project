import React from "react";
import styles from "../NotFound/NotFound.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <span className={styles.message}>
        We're sorry! What you are looking for has not been found. Try typing the
        exact name
      </span>
      <img
        className={styles.image}
        src="https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png"
        alt="Not found"
      />
    </div>
  );
}
