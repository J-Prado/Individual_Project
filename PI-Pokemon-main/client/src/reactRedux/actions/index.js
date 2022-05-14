import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
// export const FILTER_POKEMON = "FILTER_POKEMON";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const SEARCH_BY_ID = "SEARCH_BY_ID";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const DB_POKEMONS = "DB_POKEMONS";
export const POKEMON_TYPE = "POKEMON_TYPE";
// export const FILTER_ALL = "FILTER_ALL";
export const ORDER_A_Z = "ORDER_A_Z";
export const ORDER_Z_A = "ORDER_Z_A";
export const HIGH_TO_LOW = "HIGH_TO_LOW";
export const LOW_TO_HIGH = "LOW_TO_HIGH";

export function getPokemon() {
  return async function (dispatch) {
    const resp = await axios.get("http://localhost:3001/pokemons");
    const json = await resp.data;
    return dispatch({
      type: GET_POKEMON,
      payload: json,
    });
  };
}

export function get_types() {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:3001/types");
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
      const res = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      const json = await res.data;
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: [json],
      });
    } catch (error) {
      throw new TypeError("Pokemon not Found");
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    // if (id === "clear") {
    //   dispatch({
    //     type: SEARCH_BY_ID,
    //     payload: "clear",
    //   });
    // }
    const res = await axios.get(`http://localhost:3001/pokemons/${id}`);
    const json = await res.data;
    return dispatch({
      type: SEARCH_BY_ID,
      payload: json,
    });
  };
}

// export function filterPokemon(type, pokemons) {
//   return async function (dispatch) {
//     const filtrados = [];
//     await pokemons.map((obj) =>
//       obj.types.map((name) => {
//         return name === type ? filtrados.push(obj) : "";
//       })
//     );
//     return dispatch({
//       type: FILTER_POKEMON,
//       payload: filtrados,
//     });
//   };
// }

export function postPokemon(
  name,
  hp,
  attack,
  defense,
  speed,
  heigth,
  weight,
  type1,
  type2,
  image
) {
  return async function (dispatch) {
    const body = {
      name,
      hp,
      attack,
      defense,
      speed,
      heigth,
      weight,
      image,
    };
    const send = { ...body, type1: [type1, type2] };
    await axios.post("http://localhost:3001/pokemons", send);
    const get = await axios.get("http://localhost:3001/pokemons");
    const json = await get.data;

    return dispatch({
      type: POST_POKEMONS,
      payload: json,
    });
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

// export function filterAll() {
//   return async function (dispatch) {
//     return dispatch({
//       type: FILTER_ALL,
//     });
//   };
// }

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
