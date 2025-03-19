import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "dish",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["Card", "Cash", "Blik"],
      required: true,
    },
    deliveryAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
