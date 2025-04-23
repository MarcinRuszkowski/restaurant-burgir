import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGuestOrder,
  createUserOrder,
  getOrderHistory,
} from "../API/orderAPI";
import { OrderData } from "../types/types";

export const useUserOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
    },
  });
};

export const useGusetOrder = () => {
  return useMutation({
    mutationFn: createGuestOrder,
    onSuccess: (orderData: OrderData) => {
      createGuestOrder(orderData);
    },
  });
};

export const useOrderHistory = () => {
  return useQuery({
    queryKey: ["orderHistory"],
    queryFn: getOrderHistory,
  });
};
