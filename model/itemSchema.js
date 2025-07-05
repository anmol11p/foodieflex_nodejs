import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["meal", "fast food", "drink", "dessert"],
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const itemModel = mongoose.model("Item", itemSchema);
export default itemModel;
