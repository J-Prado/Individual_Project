import {
  GET_POKEMON,
  FILTER_POKEMON,
  FILTER_ALL,
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
  search: [],
  pokemonType: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsBack: action.payload,
      };

    case SEARCH_BY_ID:
      return {
        ...state,
        search: action.payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        search: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case ORDER_A_Z:
      let forward = [...state.pokemons].sort(function (a, b) {
        let order = a.name
          .toLocalLowerCase()
          .localCompare(b.name.toLocalLowerCase());
        return order;
      });
      return {
        ...state,
        pokemons: forward,
      };

    case ORDER_Z_A:
      let backward = [...state.pokemons].sort(function (a, b) {
        let order = b.name
          .toLocalLowerCase()
          .localCompare(a.name.toLocalLowerCase());
        return order;
      });
      return {
        ...state,
        pokemons: backward,
      };

    case DB_POKEMONS:
      let dbPokemons = [...state.pokemons].filter((e) => {
        return e.id.length !== undefined;
      });
      return {
        ...state,
        pokemons: dbPokemons,
      };

    case FILTER_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };

    case FILTER_ALL:
      return {
        ...state,
        pokemon: state.pokemonsBack,
      };

    case POKEMON_TYPE:
      let types = [];
      [...state.pokemonsBack].map((e) =>
        e.types.forEach((type) => {
          if (type.name === action.payload) {
            return types.push(e);
          }
        })
      );
      return {
        ...state,
        pokemons: types,
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
