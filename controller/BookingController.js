import bookingModel from "../model/bookingSchema.js";
import itemModel from "../model/itemSchema.js";

const orderBook = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { items, deliveryAddress, redirectTo } = req.body;
    const item = await itemModel.findById(items[0].itemId);
    if (!item) {
      req.flash("error", "Item not found");
      return res.redirect(redirectTo);
    }

    const totalAmount = Number(item.price) * parseInt(items[0].quantity);

    const order = new bookingModel({
      userId,
      items,
      totalAmount,
      deliveryAddress,
    });

    await order.save();

    req.flash("success", "Order placed successfully");
    return res.redirect(redirectTo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const cancelOrder = async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    req.flash("error", "Order ID is required.");
    return res.redirect("/orders");
  }

  try {
    const order = await bookingModel.findById(id);
    if (!order) {
      req.flash("error", "Order not found!!");
      return res.status(404).redirect("/orders");
    }

    if (order.status === "delivered") {
      req.flash("error", "Delivered product cannot be cancelled.");
      return res.status(400).redirect("/orders");
    }

    if (order.status === "cancelled") {
      req.flash("error", "Product is already cancelled.");
      return res.status(400).redirect("/orders");
    }

    order.status = "cancelled";
    await order.save();

    req.flash("success", "Order cancelled successfully");
    return res.status(200).redirect("/orders");
  } catch (error) {
    next(error);
  }
};

export { orderBook, cancelOrder };
