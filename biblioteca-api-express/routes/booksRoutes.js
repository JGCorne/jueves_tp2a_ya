import { Router } from "express";
import { validate, validateQuery } from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema, paginationSchema } from "../schemas/bookSchema.js";

// Recibe el controller ya armado (con sus dependencias) y devuelve el router
function createBooksRouter(controller) {
  const router = Router();

  router.get("/", validateQuery(paginationSchema), controller.list);
  router.get("/:id", controller.get);
  router.post("/", validate(createBookSchema), controller.create);
  router.put("/:id", validate(updateBookSchema), controller.update);
  router.delete("/:id", controller.remove);

  return router;
}

export default createBooksRouter;
