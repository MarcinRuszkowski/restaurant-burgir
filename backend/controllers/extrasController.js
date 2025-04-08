import asyncHandler from "express-async-handler";
import Extra from "../models/extrasModel.js";

export const getAllExtras = asyncHandler(async (req, res) => {
  const extras = await Extra.find();
  res.json(extras);
});
