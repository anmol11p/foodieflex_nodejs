// index.js
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dbconnect from "./connection/connection.js";
import AuthRouter from "./router/Authrouter.js";
import ErrorMiddleware from "./Middleware/ErrorMiddleware.js";
import menuRouter from "./router/MenuRouter.js";
import bookingRouter from "./router/BookingRouter.js";
import { PageRouter } from "./router/AllPageRouter.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./Middleware/AuthMiddleware.js";
import session from "express-session";
import flash from "connect-flash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "anmolPanday",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());

try {
  await dbconnect();
  console.log(" Connected to database");
} catch (err) {
  console.error(" DB connection failed:", err);
  process.exit(1);
}

app.use(authMiddleware);
app.use("/", PageRouter);
app.use("/auth", AuthRouter);
app.use("/item", menuRouter);
app.use("/book", bookingRouter);

app.use(ErrorMiddleware);

const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port http://localhost:${PORT}`);
  });
}

export default app;
