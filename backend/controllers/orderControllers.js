import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Dish from "../models/dishModel.js";

export const createUsersOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress, paymentMethod, name, phone } = req.body;

  let totalOrderPrice = 0;
  const orderItems = [];

  const userName = req.user ? req.user.name : name;
  const userPhone = req.user ? req.user.phone : phone;
  const userId = req.user ? req.user._id : null;

  for (let item of items) {
    const { dish, quantity } = item;
    const orderedDish = await Dish.findById(dish);

    const totalPrice = orderedDish.price * quantity;
    totalOrderPrice += totalPrice;

    orderItems.push({
      dish: orderedDish._id,
      name: orderedDish.name,
      quantity,
      totalPrice,
    });
  }

  await Order.create({
    userId,
    items: orderItems,
    totalPrice: totalOrderPrice,
    paymentMethod,
    deliveryAddress,
  });

  const responseItems = orderItems.map((item) => ({
    [item.name]: item.quantity,
  }));

  const responseData = {
    user: userName,
    phone: userPhone,
    items: responseItems,
    totalPrice: totalOrderPrice.toFixed(2),
    paymentMethod,
    deliveryAddress,
  };

  return res.status(200).json(responseData);
});
