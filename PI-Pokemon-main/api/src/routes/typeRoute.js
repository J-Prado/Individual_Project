const axios = require("axios");
const { Type } = require("../db");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res, next) => {
  let typeDb = await Type.findAll();

  try {
    if (typeDb.length === 0) {
      let typeApi = await axios.get(`https://pokeapi.co/api/v2/type`);

      typeApi = typeApi.data.results.map((e) => {
        return { name: e.name };
      });

      typeDb = await Type.bulkCreate(typeApi);
    }
    res.json(typeDb);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
