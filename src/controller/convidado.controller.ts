import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export async function getAll(req: Request, res: Response) {
    try{
        const list = await prisma
    }
}