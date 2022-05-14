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
    <nav>
      {pageNumbers?.map((number) => (
        <div key={number}>
          <button onClick={() => pagination(number)}>{number}</button>
        </div>
      ))}
    </nav>
  );
}
