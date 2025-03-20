import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Dish from "../models/dishModel.js";
import Extra from "../models/ExtrasModel.js";

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

const processItems = async (item) => {
  const { dish, quantity, bun, doneness, extras } = item;

  const orderedDish = await Dish.findById(dish);

  const { extrasDetails, extrasCost } = await getExtrasDetails(extras);
  const totalPrice = (orderedDish.price + extrasCost) * quantity;

  return {
    dish: orderedDish._id,
    name: orderedDish.name,
    quantity,
    bun,
    doneness,
    extras: extrasDetails,
    totalPrice,
  };
};

export const createOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress, paymentMethod, name, phone, note } = req.body;

  const userName = req.user ? req.user.name : name;
  const userPhone = req.user ? req.user.phone : phone;
  const userId = req.user ? req.user._id : null;

  let totalOrderPrice = 0;
  const orderItems = [];
  const responseItemsArray = [];

  for (let item of items) {
    const processedItems = await processItems(item);
    responseItemsArray.push(processedItems);
    orderItems.push({
      dish: item.dish,
      quantity: item.quantity,
      bun: item.bun,
      doneness: item.doneness,
      extras: item.extras.map((extra) => extra),
    });

    totalOrderPrice += processedItems.totalPrice;
  }

  await Order.create({
    userId,
    items: orderItems,
    totalPrice: totalOrderPrice.toFixed(2),
    paymentMethod,
    deliveryAddress,
    note,
  });

  const responseItems = responseItemsArray.map((item) => ({
    [item.name]: item.quantity,
    bun: item.bun,
    doneness: item.doneness,
    extras: item.extras.map((extra) => extra.name),
    totalPrice: item.totalPrice.toFixed(2),
  }));

  const responseData = {
    user: userName,
    phone: userPhone,
    items: responseItems,
    totalPrice: totalOrderPrice.toFixed(2),
    paymentMethod,
    deliveryAddress,
    note,
  };

  return res.status(200).json(responseData);
});
