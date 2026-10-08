import { Router } from "express";
import createBooksRouter from "./booksRoutes.js";
import authorsRoutes from "./authorsRoutes.js";

function createRouter(booksController) {
  const router = Router();
  router.use("/books", createBooksRouter(booksController));
  router.use("/authors", authorsRoutes);
  return router;
}

export default createRouter;
