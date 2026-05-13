import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "prisma/config";
import { Perfil } from "../../generated/prisma/enums.js";

export interface AuthRequest extends Request {
  userId?: number;
  perfil?: Perfil;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não fornecido ou mal formatado" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  try {
    const payload = jwt.verify(token, env("JWT_SECRET") as string) as {
      userId: number;
      perfil: Perfil; 
    };
    req.userId = payload.userId;
    req.perfil = payload.perfil; 

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
}