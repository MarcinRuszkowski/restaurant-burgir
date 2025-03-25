import express from "express";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/requestPasswordReset", requestPasswordReset);
router.post("/resetPassword", resetPassword);

export default router;
