const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const getPokemons = async () => {
  try {
    const allPokemons = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    );
    const allPokemonsSub = allPokemons.data.results.map((obj) =>
      axios.get(obj.url)
    );
    const urlInfo = await axios.all(allPokemonsSub);
    let pokemons = urlInfo.map((element) => element.data);
    let information = pokemons.map((pokemon) => objPokeApi(pokemon));
    return information;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

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
        attack: element.attack,
        defense: element.defense,
        speed: element.speed,
        height: element.height,
        weight: element.weight,
        image: element.image,
        createdDb: element.createdDb,
        types: element.types.map((type) => type.name),
      };
    });
    return dataBasePok;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// This must be exported
const getAllPokemons = async () => {
  try {
    const apiPokemon = await getPokemons();
    const dbPokemon = await getDbPok();
    return [...apiPokemon, ...dbPokemon];
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// This must be exported
const getName = async (name) => {
  try {
    const pokemonFromDb = await Pokemon.findOne({
      where: { name },
      include: Type,
    });
    // console.log(pokemonFromDb);
    if (pokemonFromDb) {
      let dbName = {
        id: pokemonFromDb.id,
        name: pokemonFromDb.name,
        hp: pokemonFromDb.hp,
        attack: pokemonFromDb.attack,
        defense: pokemonFromDb.defense,
        speed: pokemonFromDb.speed,
        height: pokemonFromDb.height,
        weight: pokemonFromDb.weight,
        image: pokemonFromDb.image,
        createdDb: pokemonFromDb.createdDb,
        types: pokemonFromDb.types.map((type) => type.name),
      };
      return dbName;
    } else {
      const apiNames = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const foundApi = objPokeApi(apiNames.data);
      // console.log(foundApi);
      return foundApi;
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// This must be exported
const getId = async (id) => {
  try {
    if (id.length > 2) {
      const searchPokeIdDb = await Pokemon.findOne({
        where: { id },
        include: Type,
      });

      let dbPokeId = {
        id: searchPokeIdDb.id,
        name: searchPokeIdDb.name,
        hp: searchPokeIdDb.hp,
        attack: searchPokeIdDb.attack,
        defense: searchPokeIdDb.defense,
        speed: searchPokeIdDb.speed,
        height: searchPokeIdDb.height,
        weight: searchPokeIdDb.weight,
        image: searchPokeIdDb.image,
        createdDb: searchPokeIdDb.createdDb,
        types: searchPokeIdDb.types.map((type) => type.name),
      };
      return dbPokeId;
    } else {
      const searchId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id.toString()}`
      );
      const foundApi = objDetail(searchId.data);
      return foundApi;
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
};

const objPokeApi = (poke) => {
  const objPokeApi = {
    id: poke.id,
    name: poke.name,
    // hp: poke.stats[0].base_stat,
    attack: poke.stats[1].base_stat,
    // defense: poke.stats[2].base_stat,
    // speed: poke.stats[5].base_stat,
    // height: poke.height,
    // weight: poke.weight,
    image: poke.sprites.other.dream_world.front_default,
    types: poke.types.map((e) => e.type.name),
  };
  return objPokeApi;
};

const objDetail = (poke) => {
  const objPokeApi = {
    id: poke.id,
    name: poke.name,
    hp: poke.stats[0].base_stat,
    attack: poke.stats[1].base_stat,
    defense: poke.stats[2].base_stat,
    speed: poke.stats[5].base_stat,
    height: poke.height,
    weight: poke.weight,
    image: poke.sprites.other.dream_world.front_default,
    types: poke.types.map((e) => e.type.name),
  };
  return objPokeApi;
};

// This must be exported
const postPokeDb = async (pokeData) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      pokeData;
    // console.log(types);
    const myPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });

    let dbTypes = await Promise.all(
      types.map((e) => {
        return Type.findOne({ where: { name: e } });
      })
    );
    // console.log(dbTypes);
    let createdMyPoke = await myPokemon.setTypes(dbTypes);
    return createdMyPoke;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

module.exports = {
  getAllPokemons,
  getName,
  getId,
  postPokeDb,
};
