import axios from "axios";
import { OAUTH_EXCHANGE_EXPIRY } from "../connection/constant.js";
import OauthModel from "../model/OathSchema.js";
import userModel from "../model/userSchema.js";
import jwt from "jsonwebtoken";
export const cookieConfig = {
  httpOnly: true,
  secure: false,
  maxAge: OAUTH_EXCHANGE_EXPIRY,
  sameSite: "lax",
};

export const AuthAccountDetails = async (provider, providerAccountId) => {
  return await OauthModel.findOne({
    provider,
    providerAccountId,
  }).populate("userId");
};

export const createNewUser = async (fullname, email, password, phone) => {
  return await userModel.create({
    fullname,
    email,
    password,
    phone,
  });
};
export const CreatenewAuthUser = async (
  userId,
  provider,
  providerAccountId
) => {
  await OauthModel.create({
    userId,
    provider,
    providerAccountId,
  });
};

export const genereateToken = (id) => {
  return jwt.sign({ id }, process.env.SecretKey, { expiresIn: "5h" });
};

export const storeTokenCookies = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 5 * 60 * 60 * 1000,
  });
};

export const githubUserResponseAPI = (tokens) => {
  return axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });
};

export const githubEmailResponseAPI = async (tokens) => {
  return await axios.get("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });
};
