import React from "react";
import SearchBar from "../SearchBar/searchBar.jsx";
import { Link } from "react-router-dom";
import styles from "../NavBar/NavBar.module.scss";

export default function NavBar({
  types,
  handleFilterType,
  handleFilterDataBase,
  handleNameFor,
  handleNameBack,
  handleHighStats,
  handleLowStats,
  handleClick,
}) {
  return (
    <nav>
      <div>
        <img
          src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
          alt="Welcome to the home page."
          onClick={handleClick}
        />
      </div>
      <div className={styles.navContainer}>
        <div>
          <SearchBar />
        </div>
        <div>
          <select onChange={handleFilterType}>
            <option value="all" key="all">
              all types{" "}
            </option>
            {types?.map((type) => {
              return (
                <option value={type.name} key={type.name}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select onChange={handleFilterDataBase}>
            <option value="all">All Pokemons</option>
            <option value="dataBase">My Pokemons</option>
            <option value="api">Server</option>
          </select>
        </div>
        <div>
          <button onClick={handleNameFor}>From A - Z</button>
        </div>
        <div>
          <button onClick={handleNameBack}>From Z - A</button>
        </div>
        <div>
          <button onClick={handleHighStats}>From Strong to Weak</button>
        </div>
        <div>
          <button onClick={handleLowStats}>From Weak to Strong</button>
        </div>
      </div>

      <div>
        <Link to="/create">
          <button className={styles.navBut}>Create Pokemon</button>
        </Link>
      </div>
    </nav>
  );
}
