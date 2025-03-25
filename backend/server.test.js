const request = require("supertest");
const app = require("./server"); // your Express app

describe("POST /log", () => {
  it("should log a city with timestamp", async () => {
    const res = await request(app).post("/log").send({
      cityName: "Vilnius",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged and saved to DB");
  });

  it("should return 400 if data is missing", async () => {
    const res = await request(app).post("/log").send({});
    expect(res.statusCode).toBe(400);
  });
});
