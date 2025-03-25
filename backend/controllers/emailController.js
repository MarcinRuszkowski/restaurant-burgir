import asyncHandler from "express-async-handler";
import { sendEmail } from "../utils/sendEmail.js";
import { validateEmail } from "../utils/validateEmail.js";

export const sendOrderConfirmation = asyncHandler(async (orderData) => {
  const { email } = orderData;

  const validatedEmail = validateEmail(email);
  if (!validatedEmail) {
    throw new Error("Incorrect email format");
  }

  await sendEmail(email, "Potwierdzenie zamówienia", "orderConfirmation", {
    ...orderData,
  });
  console.log("An email confirming your order has been sent");
});

export const welcomeEmail = asyncHandler(async (userData) => {
  const { email, name } = userData;

  const validatedEmail = validateEmail(email);
  if (!validatedEmail) {
    throw new Error("Incorrect email format");
  }

  await sendEmail(email, "Podziękowanie", "welcomeEmail", {
    name,
  });
});
