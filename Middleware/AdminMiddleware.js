import userModel from "../model/userSchema.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    const id = req.user;
    // check user is admin or not
    const user = await userModel.findById(id);
    const admin = user.role === "admin";
    if (!admin) {
      return res.status(401).json({ message: "permission not granted" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
