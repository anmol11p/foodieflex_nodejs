import { ZodError } from "zod";

export const zodMiddleware = (schema, redirectPath) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const filteredErrors = error.errors
        .map((e) => e.message)
        .filter((msg) => msg !== "Required");

      req.flash("error", filteredErrors);
      return res.redirect(redirectPath || "back");
    }
    next(error);
  }
};
