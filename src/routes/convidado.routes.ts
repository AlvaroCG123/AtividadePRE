import { Router } from "express";

import { createOneConvidado, DeleteOneConvidado, getAll, updateOneConvidado } from "../controller/convidado.controller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { requireAdminMiddleware } from "../middleware/AuthAdminMidlleware.js";


const router = Router()

router.get("/",authMiddleware, getAll)
router.post("/criar",authMiddleware, createOneConvidado)
router.patch("/atualizar/:id",authMiddleware,requireAdminMiddleware, updateOneConvidado)
router.patch("/:id/checkin",authMiddleware,requireAdminMiddleware, updateOneConvidado)
router.delete("/delete/:id",authMiddleware,requireAdminMiddleware, DeleteOneConvidado)

export default router