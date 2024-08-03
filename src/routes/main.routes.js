import { Router } from "express";
import { createPart, createPartView, deletePart, getMain, getPart, updatePart } from "../controllers/main.controllers.js";

const router = Router();

router.get("/", getMain);

router.route("/create")
            .get( createPartView )
            .post( createPart );

router.route("/part/:id")
            .get( getPart )
            .put( updatePart )
            .delete( deletePart );

export default router;