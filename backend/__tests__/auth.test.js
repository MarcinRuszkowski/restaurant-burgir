import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import { jest } from "@jest/globals";
// import * as emailUtils from "../utils/sendEmail.js";

// jest.mock("../utils/sendEmail.js", () => ({
//   sendEmail: jest.fn(),
// }));

let mongoServer;
let user;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  user = await User.create({
    name: "Test User",
    email: "test.test@test.pl",
    password: "oldpassword",
  });

  const secret = process.env.JWT_SECRET + user.password;
  token = jwt.sign({ id: user._id, email: user.email }, secret, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("POST /api/auth/requestPasswordReset", () => {
  it("should send a reset link", async () => {
    const res = await request(app)
      .post("/api/auth/requestPasswordReset")
      .send({ email: "test.test@test.pl" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Password reset link sent");
    // expect(emailUtils.sendEmail).toHaveBeenCalled();
    // expect(sendEmail).toHaveBeenCalledWith(
    //   "test.test@test.pl",
    //   "Resetowanie hasła",
    //   "resetPassword",
    //   expect.objectContaining({ resetURL: expect.any(String) })
    // );
  });

  it("should return 404 - user do not exist", async () => {
    const res = await request(app)
      .post("/api/auth/requestPasswordReset")
      .send({ email: "not.exist@user.com" });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User doesn't exist");
  });
});

describe("POST /api/auth/resetPassword", () => {
  it("should reset password", async () => {
    const res = await request(app)
      .post(`/api/auth/resetPassword?id=${user._id}&token=${token}`)
      .send({ password: "newPassword" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Password has been reset");

    const updatedUser = await User.findById(user._id);
    const matchedPassword = await bcrypt.compare(
      "newPassword",
      updatedUser.password
    );
    expect(matchedPassword).toBeTruthy();
  });

  it("should return 400 - expired token", async () => {
    const secret = process.env.JWT_SECRET + user.password;
    const expiredToken = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "-10s",
    });

    const res = await request(app)
      .post(`/api/auth/resetPassword?id=${user._id}&token=${expiredToken}`)
      .send({ password: "newPassword" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  it("should return 400 - invalid token", async () => {
    const res = await request(app)
      .post(`/api/auth/resetPassword?id=${user._id}&token=invalidToken`)
      .send({ password: "newPassword" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid or expired token");
  });
});
