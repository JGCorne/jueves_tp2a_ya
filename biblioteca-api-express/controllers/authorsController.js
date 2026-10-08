import authors from "../data/authors.js";
import AppError from "../errors/AppError.js";

export function list(req, res, next) {
  res.status(200).json(authors);
}

export function get(req, res, next) {
  const author = authors.find((a) => a.id === Number(req.params.id));
  if (!author) {
    return next(new AppError("AUTHOR_NOT_FOUND", `No author exists with id ${req.params.id}`, 404));
  }
  res.status(200).json(author);
}
