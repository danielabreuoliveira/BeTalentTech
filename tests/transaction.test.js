const request = require("supertest");
const app = require("../app");

describe("POST /transactions", () => {

  it("should create a transaction", async () => {

    const response = await request(app)
      .post("/api/transactions")
      .send({
        client: 1,
        amount: 200,
        card_last_numbers: "1234"
      });

    expect(response.statusCode).toBe(201);

  });

});