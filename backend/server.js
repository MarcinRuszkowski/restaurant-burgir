import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import dishRoutes from "./routes/dishRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import extrasRoutes from "./routes/extrasRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/dish", dishRoutes);
app.use("/api/extras", extrasRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/server", (req, res) => {
  res.send({ message: "Server ready" });
});
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log("Server is running");
  });
}
export default app;
