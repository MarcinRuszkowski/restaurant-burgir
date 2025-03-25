import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }

  const secret = process.env.JWT + user.password;
  const token = jwt.sign({ id: user._id, email: user.email }, secret, {
    expiresIn: "1h",
  });

  const resetURL = `http://localhost:${process.env.PORT}/api/auth/resetpassword?id=${user._id}&token=${token}`;

  await sendEmail(email, "Resetowanie hasła", "resetPassword", { resetURL });

  res.status(200).json({ message: "Password reset link sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.query;

  const { password } = req.body;

  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist");
  }

  const secret = process.env.JWT + user.password;
  try {
    jwt.verify(token, secret);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  user.password = password
  await user.save();
  res.status(200).json({ message: "Password has been reset" });
});
