import userModel from "../model/userSchema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      req.flash("error", "User is not created");
      return res.redirect("/signup");
    }
    if (userExist.password === null) {
      req.flash(
        "error",
        "You've created account using social login.Plz login with your social account"
      );
      return res.redirect("/login");
    }
    // check password is valid or not
    const passwordValid = await argon2.verify(userExist.password, password);
    if (!passwordValid) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }
    const token = jwt.sign(
      {
        id: userExist._id,
      },
      process.env.SecretKey,
      { expiresIn: "5h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000,
    });
    req.flash("success", "Login success");
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

const signUpController = async (req, res, next) => {
  try {
    const { fullname, phone, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      req.flash("error", "user is already present make another account");
      return res.redirect("/signup");
    }

    const hashpassword = await argon2.hash(password);
    const user = new userModel({
      fullname,
      phone: Number(phone),
      email,
      password: hashpassword,
    });
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.SecretKey,
      { expiresIn: "5h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000,
    });
    req.flash("success", "User created successfully");
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("google_code_verifier");
    res.clearCookie("google_oauth_state");
    req.flash("success", "You have been logged out.");
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export { loginController, signUpController, handleLogout };
