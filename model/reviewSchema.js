import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
