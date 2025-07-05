import { Router } from "express";
import { addTheProuduct } from "../controller/MenuController.js";
import { itemZodSchema } from "../model/zod.schema.js";
import { zodMiddleware } from "../Middleware/zodMiddleware.js";

import { adminMiddleware } from "../Middleware/AdminMiddleware.js";

const menuRouter = Router();

// add the product and view the product
const isAuthenticated = (req, res, next) => {
  const user = res.locals.user;
  if (!user || !user.id) {
    req.flash("error", "Plz login or signup first");
    return res.redirect("/login");
  }
  next();
};
menuRouter
  .route("/")
  .post(
    isAuthenticated,
    adminMiddleware,
    zodMiddleware(itemZodSchema),
    addTheProuduct
  );

export default menuRouter;
