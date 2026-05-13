import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import type { CriarUsuario, Login, UpdateUsuario } from "../interface/user.interface.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from "prisma/config";
import { AuthRequest } from "../middleware/AuthMiddleware.js";

export async function getAll(req: Request, res: Response) {
    try{
        const list = await prisma.usuarios.findMany({
            select:{
                id:true,
                nome:true,
                email:true,
                senha:true,
                perfil:true,
                convidados:true
            }
        })
        res.status(200).json(list)
    }catch(error){
        res.status(400).json({message:"Erro ao listar usuarios"})
    }
}

export async function createOneUsuario(req: Request, res: Response) {
    const { nome, email,senha, perfil}:CriarUsuario = req.body
    try{
        const criar = await prisma.usuarios.create({
            data:{
                nome,
                email,
                senha,
                perfil
            },
            select:{
                id:true,
                nome:true,
                email:true,
                senha:true,
                perfil:true,
                convidados:true
            }
        })
        return res.status(201).json(criar)
    }catch(error){
        return res.status(400).json({message:"Erro ao criar usuarios"})
    }
}

export async function updateOneUsuario(req: Request, res: Response) {
    const {id} = req.params
    const {  nome, email,senha, perfil }:UpdateUsuario = req.body
    try{
        const editar = await prisma.usuarios.update({
            where:{id:Number(id)},
            data:{
                nome,
                email,
                senha,
                perfil
            },
            select:{
                id:true,
                nome:true,
                email:true,
                senha:true,
                perfil:true,
                convidados:true
            }
        })
        return res.status(201).json(editar)
    }catch(error){
        return res.status(400).json({message:"Erro ao editar usuarios"})
    }
}

export async function DeleteOneUsuario(req: Request, res: Response) {
    const {id} = req.params
    try{
        const excluir = await prisma.usuarios.delete({
            where:{id:Number(id)},
            select:{
                id:true,
                nome:true,
                email:true,
                senha:true,
                perfil:true,
                convidados:true
            }
        })
        return res.status(201).json(excluir)
    }catch(error){
        return res.status(400).json({message:"Erro ao excluir usuarios"})
    }
}

export async function login(req: Request, res: Response) {
    const { email,senha }:Login = req.body
    if (!email || !senha) {
    res.status(400).json({ error: "email e password são obrigatórios" });
    return;
  }

  const user = await prisma.usuarios.findUnique({where: { email }})

  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    res.status(401).json({ error: "Credenciais inválidas" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id},
    env("JWT_SECRET") as string,
    {expiresIn: "7d"}
  )
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  const user = await prisma.usuarios.findUnique({
    where: { id: req.userId },
    select: { id: true, nome: true, email: true },
  });

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  res.json(user);
}