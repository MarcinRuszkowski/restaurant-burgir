import Extra from "../models/ExtrasModel.js";
import {getDishById} from './orderDetailsName.js'

const getExtrasDetails = async (extras) => {
  if (!extras || extras.length === 0)
    return { extrasDetails: [], extrasCost: 0 };

  const extraIngredients = await Extra.find({ _id: { $in: extras } });

  let extrasCost = 0;
  const extrasDetails = extraIngredients.map((extra) => {
    extrasCost += extra.price;
    return { name: extra.name, price: extra.price, id: extra._id };
  });

  return { extrasDetails, extrasCost };
};

export const processItems = async (item) => {
  const { dish, quantity, bun, doneness, extras } = item;

  const { id, name, price } = await getDishById(dish);
  console.log(price);
  

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
