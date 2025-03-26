jest.mock("firebase-admin");

const request = require("supertest");
const app = require("./server");

describe("POST /log", () => {
  it("should log a city with timestamp", async () => {
    const res = await request(app).post("/log").send({
      cityName: "Vilnius",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged to Firestore");
  });

  it("should return 400 if data is missing", async () => {
    const res = await request(app).post("/log").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("City name is required");
  });
});
