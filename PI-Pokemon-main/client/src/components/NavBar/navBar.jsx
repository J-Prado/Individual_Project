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
    <React.Fragment>
      <nav className={styles.container}>
        <div className={styles.navImg}>
          <img
            className={styles.navPic}
            src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
            alt="Welcome to the home page."
            onClick={handleClick}
          />
        </div>
        <div className={styles.navBut}>
          <Link to="/create">
            <button>Create Pokemon</button>
          </Link>
        </div>
        <div className={styles.navSelect}>
          <select onChange={handleFilterType}>
            <option value="all" key="all">
              All types
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

        <div className={styles.navSelect}>
          <select onChange={handleFilterDataBase}>
            <option value="all">All Pokemons</option>
            <option value="dataBase">My Pokemons</option>
            <option value="api">Server</option>
          </select>
        </div>
        <div className={styles.navContainer2}>
          <span className={styles.navMenu}></span>
          <span className={styles.navMenu2}></span>

          <input className={styles.inputNew} type="checkbox"></input>
          <div className={styles.navOp}>
            <button className={styles.navButtons} onClick={handleNameFor}>
              From A - Z
            </button>

            <button className={styles.navButtons} onClick={handleNameBack}>
              From Z - A
            </button>

            <button className={styles.navButtons} onClick={handleHighStats}>
              From Strong to Weak
            </button>

            <button className={styles.navButtons} onClick={handleLowStats}>
              From Weak to Strong
            </button>
          </div>
          <SearchBar />
        </div>
      </nav>
    </React.Fragment>
  );
}
