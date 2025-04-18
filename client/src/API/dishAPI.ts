import axios from "axios";
import { API_URL } from "../config/API_URL.ts";

export const getAllDishes = async () => {
  const res = await axios.get(`${API_URL}/api/dish`);
  return res.data;
};
