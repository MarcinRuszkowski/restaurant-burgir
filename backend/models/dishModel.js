import mongoose from "mongoose";

const dishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  isLimited: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
