import express from "express";
import { createUsersOrder } from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user", protect, createUsersOrder);
router.post("/", createUsersOrder);

export default router;
