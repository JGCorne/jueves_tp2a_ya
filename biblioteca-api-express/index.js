import express from "express";
import { PORT, NODE_ENV } from "./config/config.js";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import booksMemoryDao from "./dao/booksMemoryDao.js";
import makeBookUseCases from "./usecases/books/makeBookUseCases.js";
import BooksController from "./controllers/booksController.js";
import createRouter from "./routes/index.js";

// Composition Root: el único lugar donde se eligen las piezas concretas y se conectan.
// Para cambiar la persistencia, alcanza con pasarle otro DAO a la factory.
const bookUseCases = makeBookUseCases(booksMemoryDao);
const booksController = new BooksController(bookUseCases);
const router = createRouter(booksController);

const app = express();

app.use(logger);
app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT} (${NODE_ENV})`);
});
