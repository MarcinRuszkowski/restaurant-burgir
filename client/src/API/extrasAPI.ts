import axios from "axios";
import { API_URL } from "../config/API_URL.ts";

export const getAllExtras = async () => {
  const res = await axios.get(`${API_URL}/api/extras`);
  return res.data;
};
