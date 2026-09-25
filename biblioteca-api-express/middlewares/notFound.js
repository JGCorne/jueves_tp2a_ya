import AppError from "../errors/AppError.js";

export function notFound(req, res, next) {
  next(new AppError("ROUTE_NOT_FOUND", `Route ${req.method} ${req.originalUrl} does not exist`, 404));
}
