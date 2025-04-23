import axios from "axios";
import { API_URL } from "../config/API_URL.ts";

axios.defaults.withCredentials = true;

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/api/user/auth`, { email, password });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${API_URL}/api/user/logout`);
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const res = await axios.post(`${API_URL}/api/user`, data);

  return res.data;
};

export const getUserProfile = async () => {
  const res = await axios.get(`${API_URL}/api/user/profile`);
  return res.data;
};

export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}) => {
  const res = await axios.put(`${API_URL}/api/user/profile`, data);
  return res.data;
};
