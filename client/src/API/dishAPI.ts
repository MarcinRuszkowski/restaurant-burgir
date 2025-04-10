import axios from "axios";
import { API_URL } from "../config/API_URL.ts";
import { Dish } from "../types/types.ts";

export const getAllDishes = async () => {
  const res = await axios.get<Dish[]>(`${API_URL}/api/dish`);
  return res.data;
};
