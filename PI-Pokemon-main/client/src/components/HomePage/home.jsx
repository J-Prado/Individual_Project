import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getPokemon,
  get_types,
  typePokemon,
  dbPokemons,
  forwardAlphabet,
  backwardAlphabet,
  // filterPokemon,
  // filterAll,
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
  const lastPokemon = page * perPage;
  const firstPokemon = lastPokemon - perPage;
  const currentPokemons = statePokemon.slice(firstPokemon, lastPokemon);
  const pokeFirstPag = statePokemon.slice(firstPokemon, lastPokemon);

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
    <React.Fragment>
      <div>
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
      </div>
      <div>
        {statePokemon.length === 0 ? (
          <LoadingPage />
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
      <div>
        <Pagination
          allPokemons={statePokemon.length}
          pokemonsPerPage={perPage}
          pagination={pagination}
        />
      </div>
    </React.Fragment>
  );
}
