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
        bun: {
          type: String,
          enum: ["Classic", "Whole Grain", "Gluten Free"],
          required: true,
        },
        doneness: {
          type: String,
          enum: ["Rare", "Medium Rare", "Well Done"],
          required: true,
        },
        extras: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Extras",
          },
        ],
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["Card", "Cash", "Blik"],
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,

    },
    note: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
