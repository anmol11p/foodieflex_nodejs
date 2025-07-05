import { Router } from "express";
import { loginSchema, registrationSchema } from "../model/zod.schema.js";
import { zodMiddleware } from "../Middleware/zodMiddleware.js";
import {
  handleLogout,
  loginController,
  signUpController,
} from "../controller/AuthController.js";

const AuthRouter = Router();

AuthRouter.route("/login").post(
  zodMiddleware(loginSchema, "/login"),
  loginController
);

AuthRouter.route("/signup").post(
  zodMiddleware(registrationSchema, "/signup"),
  signUpController
);

AuthRouter.route("/logout").post(handleLogout);
export default AuthRouter;
