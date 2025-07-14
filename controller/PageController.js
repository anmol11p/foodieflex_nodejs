import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import bookingModel from "../model/bookingSchema.js";
import itemModel from "../model/itemSchema.js";
import { google } from "../lib/OAUTH/Google.js";
import { github } from "../lib/OAUTH/Github.js";
import userModel from "../model/userSchema.js";
import {
  AuthAccountDetails,
  cookieConfig,
  CreatenewAuthUser,
  createNewUser,
  genereateToken,
  githubEmailResponseAPI,
  githubUserResponseAPI,
  storeTokenCookies,
} from "../functions/authFunction.js";
const categories = ["meal", "fast food", "drink", "dessert"];
const getHomepage = async (req, res, next) => {
  try {
    const defaultCategory = "meal";

    const data = await itemModel.find({ category: defaultCategory });
    return res.render("index", {
      items: data,
      selectedCategory: defaultCategory,
      categories,
      ToastMessage: req.flash("success"),
      errors: req.flash("error"),
    });
  } catch (err) {
    next(err);
  }
};

const getProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const data = await itemModel.find({ category });

    return res.render("index", {
      items: data,
      selectedCategory: category,
      categories,
      errors: req.flash("error"),
      ToastMessage: req.flash("success"),
    });
  } catch (err) {
    next(err);
  }
};

const LoginPage = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.redirect("/");
    }

    return res.render("login", { errors: req.flash("error") });
  } catch (error) {
    next(error);
  }
};

const SignUpPage = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.redirect("/");
    }

    return res.render("signup", { errors: req.flash("error") });
  } catch (error) {
    next(error);
  }
};

const getMenuPage = async (req, res, next) => {
  try {
    const items = await itemModel.find();

    return res.render("menu", {
      items,
      ToastMessage: req.flash("success"),
      errors: req.flash("error"),
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const allOrder = await bookingModel
      .find({ userId })
      .populate("items.itemId")
      .sort({ createdAt: -1 });

    return res.render("order", {
      orders: allOrder,
      ToastMessage: req.flash("success"),
      errors: req.flash("error"),
    });
  } catch (error) {
    next(error);
  }
};

const getGoogleLoginPage = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.redirect("/");
    }
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, [
      "openid",
      "profile",
      "email",
    ]);
    url.searchParams.set("prompt", "select_account");

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_code_verifier", codeVerifier, cookieConfig);
    return res.redirect(url.toString());
  } catch (error) {
    next(error);
  }
};

const getGithubLoginPage = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.redirect("/");
    }
    const state = generateState();
    const url = github.createAuthorizationURL(state, ["user:email"]);
    res.cookie("github_oauth_state", state, cookieConfig);
    return res.redirect(url.toString());
  } catch (error) {
    next(error);
  }
};

const getGoogleLoginCallback = async (req, res, next) => {
  try {
    const { state, code } = req.query;
    const {
      google_oauth_state: storedState,
      google_code_verifier: codeVerifier,
    } = req.cookies;

    if (
      !code ||
      !state ||
      !storedState ||
      !codeVerifier ||
      state !== storedState
    ) {
      req.flash("error", "Invalid login attempt.");
      return res.redirect("/login");
    }

    let tokens;
    try {
      tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch (error) {
      req.flash("error", "Couldn't login with Google. Please try again!");
      return res.redirect("/login");
    }

    const claims = decodeIdToken(tokens.idToken());
    const { sub: googleUserId, name, email } = claims;

    // Check if already linked
    const OathAccount = await AuthAccountDetails("google", googleUserId);

    if (OathAccount) {
      const token = genereateToken(OathAccount.userId._id);

      storeTokenCookies(res, token);

      req.flash(
        "success",
        `Welcome back ${OathAccount.userId.fullname || "user"}!`
      );
      return res.redirect("/");
    }

    // Check if user exists with email
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      await CreatenewAuthUser(userExist._id, "google", googleUserId);

      const token = genereateToken(userExist._id);
      storeTokenCookies(res, token);
      req.flash("success", `Welcome ${userExist.fullname || "user"}!`);
      return res.redirect("/");
    }

    // Create new user

    const user = await createNewUser(name, email, null, null);

    await CreatenewAuthUser(user._id, "google", googleUserId);

    const token = genereateToken(user._id);

    storeTokenCookies(res, token);

    req.flash("success", `Welcome ${user.fullname || "user"}!`);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

const getGithubLoginCallback = async (req, res, next) => {
  try {
    const { state, code } = req.query;
    const { github_oauth_state: storedState } = req.cookies;

    if (!code || !state || !storedState || state !== storedState) {
      req.flash("error", "Invalid login attempt.");
      return res.redirect("/login");
    }
    let tokens;
    try {
      tokens = await github.validateAuthorizationCode(code);
    } catch (error) {
      console.log(error);
      req.flash("error", "Couldn't login with Github. Please try again!");
      return res.redirect("/login");
    }

    const githubUserResponse = await githubUserResponseAPI(tokens);
    if (!githubUserResponse.statusText === "OK") {
      req.flash("error", "Couldn't login with Github. Please try again!");
      return res.redirect("/login");
    }
    const githubUser = githubUserResponse.data;
    const { id: githubUserId, name } = githubUser;

    const githubEmailResponse = await githubEmailResponseAPI(tokens);

    if (!githubEmailResponse.statusText === "OK") {
      req.flash("error", "Couldn't login with Github. Please try again!");
      return res.redirect("/login");
    }
    // yaha tak code coorect hai
    const emails = await githubEmailResponse.data;
    const email = emails.filter((e) => e.primary)[0].email;
    if (!email) {
      req.flash("error", "Couldn't login with Github. Please try again!");
      return res.redirect("/login");
    }

    // condition 1: user already exists with github's oauth linked
    const OathAccount = await AuthAccountDetails("github", githubUserId);
    if (OathAccount) {
      const token = genereateToken(OathAccount.userId._id);

      storeTokenCookies(res, token);

      req.flash(
        "success",
        `Welcome back ${OathAccount.userId.fullname || "user"}!`
      );
      return res.redirect("/");
    }
    // condition 2:  user already exists with same email but github's oauth is n't linked
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      await CreatenewAuthUser(userExist._id, "github", githubUserId);

      const token = genereateToken(userExist._id);

      storeTokenCookies(res, token);

      req.flash("success", `Welcome back ${userExist.fullname || "user"}!`);
      return res.redirect("/");
    }
    // condition 3: user doesn't exists
    const userCreate = await createNewUser(name, email, null, null);
    await CreatenewAuthUser(userCreate._id, "github", githubUserId);

    const token = genereateToken(userCreate._id);
    storeTokenCookies(res, token);
    req.flash("success", `Welcome back ${userCreate.fullname || "user"}!`);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};
export {
  getHomepage,
  getGithubLoginPage,
  getProductByCategory,
  LoginPage,
  SignUpPage,
  getMenuPage,
  getAllOrder,
  getGoogleLoginCallback,
  getGoogleLoginPage,
  getGithubLoginCallback,
};
