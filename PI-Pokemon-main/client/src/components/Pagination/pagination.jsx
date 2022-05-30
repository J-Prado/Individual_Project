import React from "react";
import styles from "../Pagination/Pagination.module.scss";

export default function Pagination({
  page,
  setPage,
  allPokemons,
  pagination,
  pokemonsPerPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleNext = () => {
    setPage(page + 1);
    if (page + 1 > Math.ceil(allPokemons / pokemonsPerPage)) {
      setPage(Math.ceil(allPokemons / pokemonsPerPage));
    }
  };
  const handlePrev = () => {
    setPage(page - 1);
    if (page - 1 < 1) {
      setPage(1);
    }
  };

  return (
    <div className={styles.footBar}>
      {allPokemons === 0 ? null : (
        <button
          className={styles.footBtn1}
          onClick={handlePrev}
          disabled={page - 1 < 1}
        >
          Prev
        </button>
      )}

      {pageNumbers?.map((number) => (
        <button
          key={number}
          className={styles.footBtn}
          onClick={() => pagination(number)}
        >
          {number}
        </button>
      ))}
      {allPokemons === 0 ? null : (
        <button
          className={styles.footBtn2}
          onClick={handleNext}
          disabled={page + 1 > Math.ceil(allPokemons / pokemonsPerPage)}
        >
          Next
        </button>
      )}
    </div>
  );
}
