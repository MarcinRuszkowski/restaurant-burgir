import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    return console.log("TEST PHASE");
  } else {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed", error);
      process.exit(1);
    }
  }
};

export const closeDBConnection = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};
