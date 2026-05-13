import { NextFunction, Response } from "express";
import { AuthRequest } from "./AuthMiddleware.js";

export function requireAdminMiddleware(
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void {
  if (req.perfil !== "ADMINISTRADOR") {
    res.status(403).json({ error: "Apenas admins podem acessar" });
    return;
  }
  next();
}