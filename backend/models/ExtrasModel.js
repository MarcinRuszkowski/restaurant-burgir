import mongoose from "mongoose";

const extraSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Extra = mongoose.model("Extra", extraSchema);

export default Extra;
