import { Router } from "express";
import { createOneUsuario, DeleteOneUsuario, getAll, updateOneUsuario } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { requireAdminMiddleware } from "../middleware/AuthAdminMidlleware.js";

const router = Router()

router.get("/",authMiddleware,requireAdminMiddleware, getAll)
router.post("/criar",authMiddleware,requireAdminMiddleware, createOneUsuario)
router.patch("/atualizar/:id",authMiddleware,requireAdminMiddleware, updateOneUsuario)
router.delete("/delete/:id",authMiddleware,requireAdminMiddleware, DeleteOneUsuario)

export default router