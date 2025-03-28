import { getDishById, getExtrasDetails } from "./orderDetailsName.js";

export const processItems = async (item) => {
  const { dish, quantity, bun, doneness, extras } = item;

  const { id, name, price } = await getDishById(dish);

  const { extrasDetails, extrasCost } = await getExtrasDetails(extras);
  const totalPrice = (price + extrasCost) * quantity;

  return {
    dish: id,
    name: name,
    quantity,
    bun,
    doneness,
    extras: extrasDetails,
    totalPrice,
  };
};
