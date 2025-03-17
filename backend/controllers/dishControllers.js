import asyncHandler from "express-async-handler";
import Dish from "../models/dishModel.js";

export const getAllDishes = asyncHandler(async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});
