import Dish from "../models/dishModel.js";
import Extra from "../models/ExtrasModel.js";

export const getDishById = async (dishId) => {
  const dish = await Dish.findById(dishId);

  return { name: dish.name, id: dish._id, price: dish.price };
};

export const getExtraById = async (extraId) => {
  const extra = await Extra.findById(extraId);

  return extra.name;
};

export const getExtrasDetails = async (extras) => {
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
