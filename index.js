import express from "express";
import dbconnect from "./connection/connection.js";
import AuthRouter from "./router/Authrouter.js";
import ErrorMiddleware from "./Middleware/ErrorMiddleware.js";
import menuRouter from "./router/MenuRouter.js";
import bookingRouter from "./router/BookingRouter.js";
import { PageRouter } from "./router/AllPageRouter.js";
import path from "path";
import cookieParser from "cookie-parser";
import authMiddleware from "./Middleware/AuthMiddleware.js";
import session from "express-session";
import flash from "connect-flash";
const app = express();
// add css

const __dirname = import.meta.dirname;
const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

// add template engine in project
app.set("view engine", "ejs");
app.use(cookieParser());
const secretKey = process.env.SecretKey || "anmol";

app.use(
  session({
    secret: "anmolPanday",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(express.json());
try {
  await dbconnect();
} catch (error) {
  console.error("❌ Failed to connect to DB:", error.message);
  process.exit(1);
}

// home page
app.use(authMiddleware);
app.use("/", PageRouter);

// authentication middleware
app.use("/auth", AuthRouter);
//menu middleware
app.use("/item", menuRouter);

app.use("/book", bookingRouter);
// error middleware
app.use(ErrorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}/`);
});
