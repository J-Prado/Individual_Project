import axios from "axios";
export const CLEAR_STATE = "CLEAR_STATE";
export const GET_POKEMON = "GET_POKEMON";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const SEARCH_BY_ID = "SEARCH_BY_ID";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const DB_POKEMONS = "DB_POKEMONS";
export const POKEMON_TYPE = "POKEMON_TYPE";
export const ORDER_A_Z = "ORDER_A_Z";
export const ORDER_Z_A = "ORDER_Z_A";
export const HIGH_TO_LOW = "HIGH_TO_LOW";
export const LOW_TO_HIGH = "LOW_TO_HIGH";

export function getPokemon() {
  return async function (dispatch) {
    const resp = await axios.get("/pokemons");
    const json = await resp.data;
    return dispatch({
      type: GET_POKEMON,
      payload: json,
    });
  };
}
export function clear() {
  return function (dispatch) {
    return dispatch({ type: CLEAR_STATE });
  };
}
export function get_types() {
  return async function (dispatch) {
    const res = await axios.get("/types");
    const json = await res.data;
    return dispatch({
      type: GET_TYPES,
      payload: json,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/pokemons?name=${name}`);
      const json = await res.data;
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: [json],
      });
    } catch (error) {
      // console.log(error);
      return error;
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    const res = await axios.get(`/pokemons/${id}`);
    const json = await res.data;
    return dispatch({
      type: SEARCH_BY_ID,
      payload: json,
    });
  };
}

export function postPokemon(input) {
  return async function (dispatch) {
    let route = await axios.post("/pokemons", input);

    return route;
  };
}

export function dbPokemons(option) {
  return async function (dispatch) {
    return dispatch({
      type: DB_POKEMONS,
      payload: option,
    });
  };
}

export function typePokemon(type) {
  return async function (dispatch) {
    return dispatch({
      type: POKEMON_TYPE,
      payload: type,
    });
  };
}

export function comparisonHigh() {
  return async function (dispatch) {
    return dispatch({
      type: HIGH_TO_LOW,
    });
  };
}

export function comparisonLow() {
  return async function (dispatch) {
    return dispatch({
      type: LOW_TO_HIGH,
    });
  };
}

export function forwardAlphabet() {
  return async function (dispatch) {
    return dispatch({
      type: ORDER_A_Z,
    });
  };
}

export function backwardAlphabet() {
  return async function (dispatch) {
    return dispatch({
      type: ORDER_Z_A,
    });
  };
}
