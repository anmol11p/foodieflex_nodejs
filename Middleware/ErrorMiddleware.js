const ErrorMiddleware = (err, req, res, next) => {
  try {
    const status = err.status || 400;
    const message = err.message || "error in errorMiddleware";
    req.flash("error", message);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};
export default ErrorMiddleware;
