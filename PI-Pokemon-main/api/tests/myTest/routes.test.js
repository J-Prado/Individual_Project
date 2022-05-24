const server = require("../../src/app");
const request = require("supertest-as-promised");

describe("Test status paths", () => {
  test("Get  / General path should return 200 status code ", async () => {
    const response = await request(server).get("/pokemons/");
    expect(response.statusCode).toBe(200);
  }, 20000);

  test("Get  /:id Params search should return 200 status code ", async () => {
    const response = await request(server).get("/pokemons/1");
    expect(response.statusCode).toBe(200);
  });

  test("Get  / Query search should return 200 status code ", async () => {
    const response = await request(server).get("/pokemons/?name=pikachu");
    expect(response.statusCode).toBe(200);
  });

  test("Post  / Query search should return 200 status code ", async () => {
    const response = await request(server).post("/pokemons/");
    expect(response.statusCode).toBe(200);
  });
});
