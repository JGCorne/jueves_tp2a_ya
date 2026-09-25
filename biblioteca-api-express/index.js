import express from "express";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import librosRoutes from "./routes/librosRoutes.js";
import autoresRoutes from "./routes/autoresRoutes.js";

const app = express();
const PUERTO = 3000;

app.use(logger);
app.use(express.json());

app.use("/libros", librosRoutes);
app.use("/autores", autoresRoutes);

app.use(notFound);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
