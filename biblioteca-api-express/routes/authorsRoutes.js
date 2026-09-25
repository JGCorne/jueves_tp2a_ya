import { Router } from "express";
import * as controller from "../controllers/authorsController.js";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.get);

export default router;
