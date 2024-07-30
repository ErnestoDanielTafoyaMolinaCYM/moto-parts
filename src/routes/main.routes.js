import { Router } from "express";
import { getMain } from "../controllers/main.controllers.js";

const router = Router();

router.get("/", getMain)

export default router;