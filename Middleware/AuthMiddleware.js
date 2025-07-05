// middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SecretKey);
    res.locals.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    res.locals.user = null;
    return next();
  }
};

export default authMiddleware;
