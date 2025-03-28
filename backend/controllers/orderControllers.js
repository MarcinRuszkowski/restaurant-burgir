import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { processItems } from "../utils/processOrder.js";
import { getDishById, getExtraById } from "../utils/orderDetailsName.js";
import { sendOrderConfirmation } from "./emailController.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress, paymentMethod, name, phone, note, email } =
    req.body;

  const userName = req.user ? req.user.name : name;
  const userPhone = req.user ? req.user.phone : phone;
  const userId = req.user ? req.user._id : null;
  const userEmail = req.user ? req.user.email : email;

  if (!userName || !userPhone || !userEmail) {
    res.status(400).json({ message: "Invalid user data" });
  }

  const deliveryFee =
    deliveryAddress === "Odbiór osobisty" || deliveryAddress.trim() === ""
      ? false
      : true;

  let totalOrderPrice = 0;
  const orderItems = [];
  const responseItemsArray = [];

  if (deliveryFee) {
    totalOrderPrice += 8;
  }

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

  if (orderItems.length <= 0) {
    res.status(400).json({ message: "You must order at least 1 product" });
  }

  const orderNumber = (await Order.countDocuments()) + 1;

  await Order.create({
    number: orderNumber,
    userId,
    name: userName,
    email: userEmail,
    phone: userPhone,
    items: orderItems,
    totalPrice: totalOrderPrice.toFixed(2),
    paymentMethod,
    deliveryAddress,
    note,
  });

  const responseItems = responseItemsArray.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    bun: item.bun,
    doneness: item.doneness,
    extras: item.extras.map((extra) => extra.name),
    totalPrice: item.totalPrice.toFixed(2),
  }));

  const responseData = {
    number: orderNumber,
    email: userEmail,
    user: userName,
    phone: userPhone,
    items: responseItems,
    delivery: deliveryFee ? "+ 8 zł" : "0 zł",
    totalPrice: totalOrderPrice.toFixed(2),
    paymentMethod,
    deliveryAddress,
    note,
  };

  // order confirmation
  await sendOrderConfirmation(responseData);

  return res.status(200).json(responseData);
});

export const getUserOrderHistory = asyncHandler(async (req, res) => {
  const userOrders = await Order.find({ userId: req.user._id });

  const formattedOrder = await Promise.all(
    userOrders.map(async (order) => {
      const formattedItems = await Promise.all(
        order.items.map(async (item) => {
          const dishName = await getDishById(item.dish);
          const extras = await Promise.all(
            item.extras.map(async (extra) => await getExtraById(extra))
          );

          return {
            name: dishName.name,
            quantity: item.quantity,
            extras: extras,
          };
        })
      );

      return {
        items: formattedItems,
        totalPrice: order.totalPrice,
        deliveryAddress: order.deliveryAddress,
        createdAt: new Date(order.createdAt).toLocaleDateString("pl-PL"),
      };
    })
  );

  res.status(200).json(formattedOrder);
});
