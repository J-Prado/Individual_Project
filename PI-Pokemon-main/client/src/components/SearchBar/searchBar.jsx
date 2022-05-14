import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../SearchBar/SearchBar.module.scss";
import { getByName } from "../../reactRedux/actions/index.js";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getByName(state.toLowerCase()));
    setState("");
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Name..."
        value={state}
        onChange={handleChange}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>

      <div>Results</div>
    </div>
  );
}
