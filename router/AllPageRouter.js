import { Router } from "express";
import {
  getAllOrder,
  getHomepage,
  getMenuPage,
  getProductByCategory,
  LoginPage,
  SignUpPage,
} from "../controller/PageController.js";

export const PageRouter = Router();
const isAuthenticated = (req, res, next) => {
  const user = res.locals.user;
  if (!user || !user.id) {
    req.flash("error", "Plz login or signup first");
    return res.redirect("/login");
  }
  next();
};
PageRouter.route("/").get(getHomepage);
PageRouter.route("/category/:category").get(getProductByCategory);

PageRouter.route("/login").get(LoginPage);
PageRouter.route("/signup").get(SignUpPage);
PageRouter.route("/menu").get(getMenuPage);
PageRouter.route("/orders").get(isAuthenticated, getAllOrder);
