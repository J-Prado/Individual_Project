import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getPokemon,
  get_types,
  typePokemon,
  dbPokemons,
  forwardAlphabet,
  backwardAlphabet,
  comparisonHigh,
  comparisonLow,
} from "../../reactRedux/actions/index.js";

import styles from "../HomePage/Home.module.scss";

import { IndividualCard } from "../IndividualCard/individualCard.jsx";
import LoadingPage from "../LoadingPage/loadingPage.jsx";
import NavBar from "../NavBar/navBar.jsx";
import Pagination from "../Pagination/pagination.jsx";
import NotFound from "../NotFound/notFound.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const statePokemon = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);

  //Now the pagination has to be limited to 12 in each page
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  //Here we get the pokemon index
  const lastPokemon = page * perPage;
  const firstPokemon = lastPokemon - perPage;

  const currentPokemons = Array.isArray(statePokemon)
    ? statePokemon.slice(firstPokemon, lastPokemon)
    : [];
  const pokeFirstPag = Array.isArray(statePokemon)
    ? statePokemon.slice(firstPokemon, lastPokemon)
    : [];

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  const filterPages = () => {
    if (page === 1) return pokeFirstPag;
    return currentPokemons;
  };

  useEffect(() => {
    dispatch(getPokemon());
    dispatch(get_types());
  }, [dispatch]);

  const [order, setOrder] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getPokemon());
  };

  const handleFilterType = (event) => {
    dispatch(typePokemon(event.target.value));
    setPage(1);
  };

  const handleFilterDataBase = (event) => {
    dispatch(dbPokemons(event.target.value));
  };

  const handleNameFor = (event) => {
    event.preventDefault();
    dispatch(forwardAlphabet(event.target.value));
    setPage(1);
    setOrder(`Ordered from A to Z`);
  };

  const handleNameBack = (event) => {
    event.preventDefault();
    dispatch(backwardAlphabet(event.target.value));
    setPage(1);
    setOrder(`Ordered from Z to A`);
  };

  const handleHighStats = (event) => {
    event.preventDefault();
    dispatch(comparisonHigh(event.target.value));
    setPage(1);
    setOrder(`Ordered from High to Low attack`);
  };

  const handleLowStats = (event) => {
    event.preventDefault();
    dispatch(comparisonLow(event.target.value));
    setPage(1);
    setOrder(`Ordered from Low to High attack`);
  };

  return (
    <>
      <div className={styles.container}>
        <NavBar
          types={types}
          handleFilterType={handleFilterType}
          handleFilterDataBase={handleFilterDataBase}
          handleNameFor={handleNameFor}
          handleNameBack={handleNameBack}
          handleHighStats={handleHighStats}
          handleLowStats={handleLowStats}
          handleClick={handleClick}
        />
        <div className={styles.cards}>
          {statePokemon?.length === 0 ? (
            <LoadingPage />
          ) : statePokemon?.length === 1 && statePokemon[0].message ? (
            <NotFound />
          ) : (
            filterPages()?.map((e) => {
              return (
                <IndividualCard
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  types={e.types}
                  id={e.id}
                />
              );
            })
          )}
        </div>
        <div className={styles.pagination}>
          {statePokemon?.length === 1 &&
          statePokemon.message ===
            "Request failed with status code 404" ? null : (
            <Pagination
              page={page}
              setPage={setPage}
              allPokemons={statePokemon?.length}
              pokemonsPerPage={perPage}
              pagination={pagination}
            />
          )}
        </div>
      </div>
    </>
  );
}
