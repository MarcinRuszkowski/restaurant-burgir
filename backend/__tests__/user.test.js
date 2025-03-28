import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

let mongoServer;
let testUser;
let authToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  testUser = await User.create({
    name: "Test Test",
    email: "test.test.1@gmail.com",
    password: "test",
    phone: "111222333",
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// LOGIN

describe("POST /api/user/auth", () => {
  it("should authenticate user and return token", async () => {
    const res = await request(app)
      .post("/api/user/auth")
      .set("Content-Type", "application/json")
      .send({
        email: "test.test.1@gmail.com",
        password: "test",
      });

    expect(res.status).toBe(201);
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Test");
    expect(res.body.email).toBe("test.test.1@gmail.com");

    authToken = res.headers["set-cookie"];
    console.log(authToken);
  });

  it("should return error", async () => {
    const res = await request(app)
      .post("/api/user/auth")
      .set("Content-Type", "application/json")
      .send({
        email: "test.test@gmail.com",
        password: "test",
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });
});

// REGISTER

describe("POST /api/user", () => {
  it("should create new user", async () => {
    const res = await request(app)
      .post("/api/user")
      .set("Content-Type", "application/json")
      .send({
        name: "Test Test",
        email: "test.test.2@gmail.com",
        password: "test",
        phone: "111222333",
      });

    expect(res.status).toBe(201);
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Test");
    expect(res.body.email).toBe("test.test.2@gmail.com");
    expect(res.body.phone).toBe("111222333");
  });

  it("should return 400 'user exists'", async () => {
    const res = await request(app)
      .post("/api/user")
      .set("Content-Type", "application/json")
      .send({
        name: "Test Test",
        email: "test.test.1@gmail.com",
        password: "test",
        phone: "111222333",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should return 400 'invalid email'", async () => {
    const res = await request(app)
      .post("/api/user")
      .set("Content-Type", "application/json")
      .send({
        name: "Test Test",
        email: "test.test.1gmail.com",
        password: "test",
        phone: "111222333",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email");
  });
});

// LOGOUT

describe("POST /api/user/logout", () => {
  it("should logout user and clear cookie", async () => {
    const res = await request(app).post("/api/user/logout");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User logged out");
    expect(res.headers["set-cookie"][0]).toContain("jwt=;");
  });
});

// USER PROFILE

describe("GET /api/user/profile", () => {
  it("should get user data", async () => {
    const res = await request(app)
      .get("/api/user/profile")
      .set("Cookie", authToken);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      _id: expect.any(String),
      name: "Test Test",
      email: "test.test.1@gmail.com",
      phone: "111222333",
    });
  });
});

// UPDATE USER DATA

describe("PUT /api/user/profile", () => {
  it("should update user data", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .set("Cookie", authToken)
      .send({
        name: "TestTest",
        email: "test.test.11@gmail.com",
        password: "test1",
        phone: "333111222",
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      _id: expect.any(String),
      name: "TestTest",
      email: "test.test.11@gmail.com",
      phone: "333111222",
    });

    const updatedUser = await User.findById(res.body._id);

    expect(updatedUser.name).toBe(res.body.name);
    expect(updatedUser.email).toBe(res.body.email);
    expect(updatedUser.phone).toBe(res.body.phone);

    const newPassword = await bcrypt.compare("test1", updatedUser.password);
    expect(newPassword).toBeTruthy();
  });

  it("should return 401 if not auth", async () => {
    const res = await request(app).put("/api/user/profile").send({
      name: "TestTest",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Not authorized, no token");
  });

  it("should return 404 if invalid email", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .set("Cookie", authToken)
      .send({
        email: "test.test.1gmail.com",
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Invalid email");
  });
});
