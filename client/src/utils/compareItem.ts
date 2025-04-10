import { CartItem } from "../types/types";

export const compareItem = (item1: CartItem, item2: CartItem): boolean => {
  const item1Extras = item1.extras
    .map((extra) => extra._id)
    .sort()
    .join(",");
  const item2Extras = item2.extras
    .map((extra) => extra._id)
    .sort()
    .join(",");

  return (
    item1.dish.id === item2.dish.id &&
    item1.bun === item2.bun &&
    item1.doneness === item2.doneness &&
    item1Extras === item2Extras
  );
};
