import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import Dish from "../models/dishModel.js";
import Extra from "../models/ExtrasModel.js";
import User from "../models/userModel.js";

let mongoServer;
let authToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  await Dish.create({
    _id: "67e5576c26aae9023c64a41e",
    name: "Classic Burger",
    description:
      "Wołowina 100%, chrupiący bekon, ser cheddar, sałata, cebula, sos BBQ.",
    price: 19.99,
  });

  await Extra.create({
    _id: "67dbdeddc07a21798377e98d",
    name: "Bekon",
    price: 3.0,
  });

  await User.create({
    name: "Test Test",
    email: "test.test.1@gmail.com",
    password: "test",
    phone: "111222333",
  });

  const res = await request(app).post("/api/user/auth").send({
    email: "test.test.1@gmail.com",
    password: "test",
  });

  authToken = res.headers["set-cookie"][0];
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// CREATE ORDER
// --GUEST--
describe("POST /api/order", () => {
  it("should create an order as guest", async () => {
    const order = {
      name: "Test Guest",
      email: "test.test@gmail.pl",
      phone: "111222333",
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 2,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Gluten Free",
          doneness: "Well Done",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("number");
    expect(res.body.email).toBe(order.email);
    expect(res.body.user).toBe(order.name);
    expect(res.body.phone).toBe(order.phone);
    expect(res.body.items.length).toBe(2);
    expect(res.body.paymentMethod).toBe(order.paymentMethod);
    expect(res.body.deliveryAddress).toBe(order.deliveryAddress);
    expect(res.body.note).toBe(order.note);
    expect(res.body.delivery).toBe("+ 8 zł");
    expect(Number(res.body.totalPrice)).toBeGreaterThan(0);
  });

  it("should return 400 when name missing", async () => {
    const order = {
      email: "test.test@gmail.pl",
      phone: "111222333",
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 2,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Gluten Free",
          doneness: "Well Done",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid user data");
  });

  it("should return 400 when email missing", async () => {
    const order = {
      name: "Test Guest",
      phone: "111222333",
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 2,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Gluten Free",
          doneness: "Well Done",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid user data");
  });

  it("should return 400 when phone missing", async () => {
    const order = {
      name: "Test Guest",
      email: "test.test@gmail.pl",
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 2,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Gluten Free",
          doneness: "Well Done",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid user data");
  });

  it("should return 400 when items array is empty", async () => {
    const order = {
      name: "Test Guest",
      email: "test.test@gmail.pl",
      phone: "111222333",
      items: [],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("You must order at least 1 product");
  });

  it("should return 500 when quantity of dish is 0", async () => {
    const order = {
      name: "Test Guest",
      email: "test.test@gmail.pl",
      phone: "111222333",
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 0,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(500);
  });

  it("should add '0 zł' if deliveryAddress is empty", async () => {
    const order = {
      name: "Test Guest",
      email: "test.test@gmail.pl",
      phone: "111222333",
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: " ",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };
    const res = await request(app).post("/api/order").send(order);

    expect(res.status).toBe(200);
    expect(res.body.delivery).toBe("0 zł");
  });
});

// --LOGGED USER--

describe("POST /api/order/user", () => {
  it("should create order as logged user", async () => {
    const order = {
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 2,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Gluten Free",
          doneness: "Well Done",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };

    const res = await request(app)
      .post("/api/order/user")
      .set("Cookie", authToken)
      .send(order);

    expect(res.status).toBe(200);
    expect(res.body.user).toBe("Test Test");
    expect(res.body.email).toBe("test.test.1@gmail.com");
    expect(res.body.phone).toBe("111222333");
  });

  it("should return 'No authorized' 401", async () => {
    const order = {
      items: [
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 2,
          bun: "Classic",
          doneness: "Medium Rare",
          extras: ["67dbdeddc07a21798377e98d"],
        },
        {
          dish: "67e5576c26aae9023c64a41e",
          quantity: 1,
          bun: "Gluten Free",
          doneness: "Well Done",
          extras: ["67dbdeddc07a21798377e98d"],
        },
      ],
      deliveryAddress: "ul. Test 123, Katowice",
      paymentMethod: "Cash",
      note: "Kod do domofonu 11*1111",
    };

    const res = await request(app).post("/api/order/user").send(order);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Not authorized, no token");
  });
});

describe("GET /api/order/user/history", () => {
  it("should return history of logged user", async () => {
    const res = await request(app)
      .get("/api/order/user/history")
      .set("Cookie", authToken);

    const orders = res.body;

    expect(res.status).toBe(200);
    orders.forEach((order) => {
      expect(order).toHaveProperty("items");
      expect(order).toHaveProperty("totalPrice");
      expect(order).toHaveProperty("deliveryAddress");
      expect(order).toHaveProperty("createdAt");

      order.items.forEach((item) => {
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("quantity");
        expect(item).toHaveProperty("extras");
      });
    });
  });
});
