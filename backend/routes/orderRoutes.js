import express from "express";
import { createOrder } from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user", protect, createOrder);
router.post("/", createOrder);

export default router;
