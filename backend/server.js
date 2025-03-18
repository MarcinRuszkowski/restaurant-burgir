import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import dishRoutes from "./routes/dishRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/dish", dishRoutes);

app.get("/", (req, res) => {
  res.send("Server ready");
});
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running");
});
