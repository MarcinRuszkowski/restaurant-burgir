import { OrderData } from "../types/types";

export const validateOrder = (orderData: OrderData) => {
  if (!orderData.items || orderData.items.length === 0) return false;
  if (
    !orderData.deliveryAddress ||
    !orderData.paymentMethod ||
    !orderData.email ||
    !orderData.name ||
    !orderData.phone
  )
    return false;

  return true;
};
