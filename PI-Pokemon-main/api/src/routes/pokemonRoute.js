const { Router } = require("express");
const router = Router();
const {
  getAllPokemons,
  getName,
  getId,
  postPokeDb,
} = require("../utils/apiPoke.js");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(200).send(await getAllPokemons());
    } else {
      const found = await getName(name);
      if (found) {
        return res.status(200).json(found);
      }
    }
  } catch (error) {
    return res.status(400).send("The requested Pokemon was not found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const pokeFoundId = await getId(id);
    if (pokeFoundId) return res.status(200).json(pokeFoundId);
  } catch (error) {
    console.log(error);
    return res.status(404).send("The requested Pokemon was not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const pokeData = req.body;
    await postPokeDb(pokeData);
    return res.status(200).send("The pokemon was created successfully");
  } catch (error) {
    res.status(400).send("The Pokemon could not be created");
  }
});
module.exports = router;
