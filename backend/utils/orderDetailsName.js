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
