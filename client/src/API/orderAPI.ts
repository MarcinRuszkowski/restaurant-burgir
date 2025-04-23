import axios from "axios";
import { API_URL } from "../config/API_URL.ts";
import { OrderData } from "../types/types.ts";
import { validateOrder } from "../utils/validateOrder.ts";

axios.defaults.withCredentials = true;

export const createUserOrder = async (orderData: OrderData) => {
  const res = await axios.post(`${API_URL}/api/order/user`, orderData);
  if (!validateOrder(orderData)) {
    throw new Error("Nieprawidłowe dane zamówienia");
  }
  return res.data;
};

export const createGuestOrder = async (orderData: OrderData) => {
  const res = await axios.post(`${API_URL}/api/order`, orderData);
  if (!validateOrder(orderData)) {
    throw new Error("Nieprawidłowe dane zamówienia");
  }
  return res.data;
};

export const getOrderHistory = async () => {
  const res = await axios.get(`${API_URL}/api/order/user/history`);
  return res.data;
};
