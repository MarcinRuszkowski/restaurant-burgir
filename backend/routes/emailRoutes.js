import express from "express";
import { sendOrderConfirmation } from "../controllers/emailController.js";

const router = express.Router();

router.post("/order-confirmation", sendOrderConfirmation);

export default router;
