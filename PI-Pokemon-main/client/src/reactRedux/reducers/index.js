import {
  GET_POKEMON,
  // FILTER_POKEMON,
  // FILTER_ALL,
  GET_TYPES,
  SEARCH_BY_ID,
  SEARCH_BY_NAME,
  POKEMON_TYPE,
  DB_POKEMONS,
  POST_POKEMONS,
  ORDER_A_Z,
  ORDER_Z_A,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
} from "../actions/index.js";

const initialState = {
  pokemons: [],
  pokemonsBack: [],
  types: [],
  // search: [],
  // pokemonType: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsBack: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case SEARCH_BY_ID:
      return {
        ...state,
        search: action.payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };

    case ORDER_A_Z:
      let forward = [...state.pokemons].sort(function (a, b) {
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1;
        if (b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        pokemons: forward,
      };

    case ORDER_Z_A:
      let backward = [...state.pokemons].sort(function (a, b) {
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return -1;
        if (b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase()) return 1;
        return 0;
      });
      return {
        ...state,
        pokemons: backward,
      };

    case DB_POKEMONS:
      const allPokemons = state.pokemonsBack;
      const filterDb =
        action.payload === "dataBase"
          ? allPokemons.filter((el) => el.createdDb)
          : allPokemons.filter((el) => !el.createdDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? state.pokemonsBack : filterDb,
      };

    // case FILTER_POKEMON:
    //   return {
    //     ...state,
    //     pokemons: action.payload,
    //   };

    // case FILTER_ALL:
    //   return {
    //     ...state,
    //     pokemon: state.pokemonsBack,
    //   };

    case POKEMON_TYPE:
      const pokemonBack = state.pokemonsBack;
      const filterType =
        action.payload === "all"
          ? pokemonBack
          : pokemonBack.filter((p) => p.types.includes(action.payload));

      return {
        ...state,
        pokemons: filterType,
      };

    case POST_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };

    case HIGH_TO_LOW:
      let highStats = [...state.pokemons].sort((a, b) =>
        a.attack < b.attack ? 1 : a.attack > b.attack ? -1 : 0
      );
      return {
        ...state,
        pokemons: highStats,
      };

    case LOW_TO_HIGH:
      let lowStats = [...state.pokemons].sort((a, b) =>
        a.attack > b.attack ? 1 : a.attack < b.attack ? -1 : 0
      );
      return {
        ...state,
        pokemons: lowStats,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
