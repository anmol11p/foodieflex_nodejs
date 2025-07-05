import bookingModel from "../model/bookingSchema.js";
import itemModel from "../model/itemSchema.js";

export const getHomepage = async (req, res, next) => {
  try {
    const defaultCategory = "meal";
    const categories = ["meal", "fast food", "drink", "dessert"];

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

export const getProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categories = ["meal", "fast food", "drink", "dessert"];
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

export const LoginPage = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.redirect("/");
    }

    return res.render("login", { errors: req.flash("error") });
  } catch (error) {
    next(err);
  }
};

export const SignUpPage = async (req, res, next) => {
  try {
    if (res.locals.user) {
      return res.redirect("/");
    }

    return res.render("signup", { errors: req.flash("error") });
  } catch (error) {
    next(err);
  }
};

export const getMenuPage = async (req, res, next) => {
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

export const getAllOrder = async (req, res, next) => {
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
