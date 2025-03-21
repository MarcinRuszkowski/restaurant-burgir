import express from "express";
import {
  createOrder,
  getUserOrderHistory,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user", protect, createOrder);
router.post("/", createOrder);
router.get("/user/history", protect, getUserOrderHistory);

export default router;
