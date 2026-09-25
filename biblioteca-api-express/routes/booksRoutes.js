import { Router } from "express";
import * as controller from "../controllers/booksController.js";
import { validate, validateQuery } from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema, paginationSchema } from "../schemas/bookSchema.js";

const router = Router();

router.get("/", validateQuery(paginationSchema), controller.list);
router.get("/:id", controller.get);
router.post("/", validate(createBookSchema), controller.create);
router.put("/:id", validate(updateBookSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
