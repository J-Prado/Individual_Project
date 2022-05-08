const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
// Esto se debe exportar
const getPokemons = async () => {
  try {
    const allPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    const allPokemonsSub = allPokemons.data.results.map((obj) =>
      axios.get(obj.url)
    );
    const urlInfo = await axios.all(allPokemonsSub);
    let pokemons = urlInfo.map((element) => element.data);
    let information = pokemons.map((pokemon) => objPokeApi(pokemon));
    return information;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Esto se debe exportar
const getDbPok = async () => {
  try {
    let dataBasePok = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
      },
    });
    dataBasePok = dataBasePok.map((element) => {
      return {
        id: element.id,
        name: element.name,
        hp: element.hp,
        str: element.str,
        def: element.def,
        spd: element.spd,
        height: element.height,
        weight: element.weight,
        image: element.sprite,
        createdInDb: e.createdInDb,
        types: element.types.map((type) => type.name),
      };
    });
    return dataBasePok;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Esto se debe exportar
const getAllPokemons = async () => {
  try {
    const apiPokemon = await getPokemons();
    const dbPokemon = await getDbPok();
    return [...apiPokemon, ...dbPokemon];
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Esto se debe exportar
const getName = async (name) => {
  try {
    const pokemonFromDb = await Pokemon.findOne({
      where: { name },
      include: { model: Type },
    });
    if (pokemonFromDb) {
      let dbName = {
        id: pokemonFromDb.id,
        name: pokemonFromDb.name,
        hp: pokemonFromDb.hp,
        str: pokemonFromDb.str,
        def: pokemonFromDb.def,
        spd: pokemonFromDb.spd,
        height: pokemonFromDb.height,
        weight: pokemonFromDb.weight,
        image: pokemonFromDb.sprite,
        createdInDb: pokemonFromDb.createdInDb,
        types: searchPokeIdDb.types.map((type) => type.name),
      };
      return dbName;
    } else {
      const apiNames = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const found = objPokeApi(apiNames.data);
      return found;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Esto se debe exportar
const getId = async (id) => {
  try {
    if (id.length > 2) {
      const searchPokeIdDb = await Pokemon.findOne({
        where: { id },
        include: Type,
      });
      console.log("Pokemon Data Base", searchPokeIdDb);
      let dbPokeId = {
        id: dbPokeId.id,
        name: dbPokeId.name,
        hp: dbPokeId.hp,
        str: dbPokeId.str,
        def: dbPokeId.def,
        spd: dbPokeId.spd,
        height: dbPokeId.height,
        weight: dbPokeId.weight,
        image: dbPokeId.sprite,
        createdInDb: dbPokeId.createdInDb,
        types: dbPokeId.types.map((type) => type.name),
      };
      return dbPokeId;
    } else {
      const searchId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id.toString()}`
      );
      const foundApi = objPokeApi(searchId.data);
      return foundApi;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
const objPokeApi = (poke) => {
  const objPokeApi = {
    id: poke.id,
    name: poke.name,
    hp: poke.stats[0].base_stat,
    str: poke.stats[1].base_stat,
    def: poke.stats[2].base_stat,
    spd: poke.stats[5].base_stat,
    height: poke.height,
    weight: poke.weight,
    image: poke.sprites.other.dream_world.front_default,
    types: poke.types.map((e) => e.type.name),
  };
  return objPokeApi;
};
// Esto se debe exportar
const postPokeDb = async (pokeData) => {
  try {
    const { name, hp, str, def, spd, height, weight, sprite, types } = pokeData;
    console.log(types);
    const miPoke = await Pokemon.create({
      name,
      hp,
      str,
      def,
      spd,
      height,
      weight,
      sprite,
    });

    let createdMyPoke = await miPoke.addType(types);
    return createdMyPoke;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllPokemons,
  getName,
  getId,
  postPokeDb,
};
