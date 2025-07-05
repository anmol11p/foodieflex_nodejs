import { Router } from "express";
import { cancelOrder, orderBook } from "../controller/BookingController.js";
import { zodMiddleware } from "../Middleware/zodMiddleware.js";
import { userOrderSchema } from "../model/zod.schema.js";

const bookingRouter = Router();

const isAuthenticated = (req, res, next) => {
  const user = res.locals.user;
  if (!user || !user.id) {
    req.flash("error", "Plz login or signup first");
    return res.redirect("/login");
  }
  next();
};
// order book
bookingRouter
  .route("/")
  .post(isAuthenticated, zodMiddleware(userOrderSchema, "/"), orderBook);

// cancel the order
bookingRouter.route("/cancel").post(isAuthenticated, cancelOrder);
export default bookingRouter;
