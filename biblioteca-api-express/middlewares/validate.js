import AppError from "../errors/AppError.js";

const toDetails = (error) =>
  error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    message: issue.message,
  }));

// Factory: recibe un schema de Zod y devuelve un middleware que valida req.body.
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      return next(new AppError("VALIDATION_ERROR", "Invalid data", 400, toDetails(result.error)));
    }
    req.body = result.data;
    next();
  };
}

// En Express 5 req.query es de solo lectura: el resultado validado se guarda en req.pagination.
export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return next(new AppError("VALIDATION_ERROR", "Invalid query params", 400, toDetails(result.error)));
    }
    req.pagination = result.data;
    next();
  };
}
