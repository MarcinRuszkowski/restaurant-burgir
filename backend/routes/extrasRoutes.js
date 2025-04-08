import express from "express";
import { getAllExtras } from "../controllers/extrasController.js";

const router = express.Router();

router.get("/", getAllExtras);

export default router;
