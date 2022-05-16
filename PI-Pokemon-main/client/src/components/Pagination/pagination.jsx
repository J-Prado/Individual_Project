import React from "react";
import styles from "../Pagination/Pagination.module.scss";
export default function Pagination({
  allPokemons,
  pagination,
  pokemonsPerPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.footBar}>
      {pageNumbers?.map((number) => (
        <button
          key={number}
          className={styles.footBtn}
          onClick={() => pagination(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
