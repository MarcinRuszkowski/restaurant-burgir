import { useQuery } from "@tanstack/react-query";
import { getAllExtras } from "../API/extrasAPI";

export const useExtras = () => {
  return useQuery({
    queryKey: ["extras"],
    queryFn: getAllExtras,
    staleTime: 1000 * 60 * 3,
  });
};
