import { Router } from "express";
import * as controller from "../controllers/autoresController.js";

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.obtener);

export default router;
