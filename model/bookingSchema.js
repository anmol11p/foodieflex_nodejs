import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["placed", "preparing", "delivered", "cancelled"],
      default: "placed",
    },
    deliveryAddress: String,
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("Order", bookingSchema);
export default bookingModel;
