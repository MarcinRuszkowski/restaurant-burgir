import express from "express";
import { getAllDishes } from "../controllers/dishControllers.js";

const router = express.Router();

router.get("/", getAllDishes);

export default router;
