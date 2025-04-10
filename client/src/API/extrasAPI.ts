import axios from "axios";
import { API_URL } from "../config/API_URL.ts";
import { Extras } from "../types/types.ts";

export const getAllExtras = async () => {
  const res = await axios.get<Extras[]>(`${API_URL}/api/extras`);
  return res.data;
};
