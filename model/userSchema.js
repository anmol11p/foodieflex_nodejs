import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  phone: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
