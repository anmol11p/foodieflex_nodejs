import { Router } from "express";
import {
  getAllOrder,
  getGithubLoginPage,
  getGithubLoginCallback,
  getGoogleLoginCallback,
  getGoogleLoginPage,
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

// login with google
PageRouter.route("/google").get(getGoogleLoginPage);
// login with github
PageRouter.route("/github").get(getGithubLoginPage);
// redirect after Oauth login
PageRouter.route("/google/callback").get(getGoogleLoginCallback);
PageRouter.route("/github/callback").get(getGithubLoginCallback);

PageRouter.route("/menu").get(getMenuPage);
PageRouter.route("/orders").get(isAuthenticated, getAllOrder);
