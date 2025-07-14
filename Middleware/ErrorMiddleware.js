const ErrorMiddleware = (err, req, res, next) => {
  try {
    const status = err.status || 400;
    const message = err.message || "error in errorMiddleware";
    // console.log(err);
    req.flash("error", message);
    return res.redirect("/");
  } catch (error) {
    // console.log(err);
    next(error);
  }
};
export default ErrorMiddleware;
