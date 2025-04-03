import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;


export const getAllDishes = async () => {
  const res = await axios.get(`${API_URL}/api/dish`);
  return res.data;
};
