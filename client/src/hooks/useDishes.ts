import { useQuery } from "@tanstack/react-query";
import { getAllDishes } from "../API/dishAPI";

export const useDishes = () => {
  return useQuery({
    queryKey: ["dishes"],
    queryFn: getAllDishes,
    staleTime: 1000 * 60 * 3,
  });
};
