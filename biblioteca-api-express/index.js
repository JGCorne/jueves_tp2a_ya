import express from "express";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import booksRoutes from "./routes/booksRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";

const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);

// Cierre: primero el 404 de rutas, al final el manejador de errores
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
