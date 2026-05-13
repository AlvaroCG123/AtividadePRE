import { Router } from "express";

import { createOneConvidado, DeleteOneConvidado, getAll, updateOneConvidado } from "../controller/convidado.controller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { requireAdminMiddleware } from "../middleware/AuthAdminMidlleware.js";


const router = Router()

router.get("/",authMiddleware, getAll)
router.post("/criar",authMiddleware, createOneConvidado)
router.patch("/atualizar",authMiddleware,requireAdminMiddleware, updateOneConvidado)
router.delete("/delete",authMiddleware,requireAdminMiddleware, DeleteOneConvidado)

export default router