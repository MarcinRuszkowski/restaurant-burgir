import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import Dish from "../models/dishModel.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("GET /api/dish", () => {
  it("should return a list of dishes", async () => {
    await Dish.create({
      name: "Burger Szefowski",
      description: "Dużo lepkiego sosu",
      price: 3.49,
      image: null,
    });

    const res = await request(app).get("/api/dish");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Burger Szefowski");
  });
});
