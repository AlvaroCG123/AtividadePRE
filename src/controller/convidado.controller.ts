import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import type { CriarConvidado, UpdateConvidado } from "../interface/convidado.interface.js";


export async function getAll(req: Request, res: Response) {
    try{
        const list = await prisma.convidados.findMany({
            select:{
                id:true,
                nome:true,
                email:true,
                telefone:true,
                criado_por:true,
                status_checkin:true

            }
        })
        res.status(200).json(list)
    }catch(error){
        res.status(400).json({message:"Erro ao listar usuarios"})
    }
}

export async function createOneConvidado(req: Request, res: Response) {
    const { nome, email,telefone,status_checkin,usuarioid}:CriarConvidado = req.body
    try{
        const criar = await prisma.convidados.create({
            data:{
                nome,
                email,
                telefone,
                status_checkin,
                usuarioid
            },
            select:{
                id:true,
                nome:true,
                email:true,
                telefone:true,
                criado_por:true,
                status_checkin:true
            }
        })
        return res.status(201).json(criar)
    }catch(error){
        return res.status(400).json({message:"Erro ao criar usuarios"})
    }
}

export async function updateOneConvidado(req: Request, res: Response) {
    const {id} = req.params
    const { nome, email, telefone, status_checkin, usuarioid }:UpdateConvidado = req.body
    try{
        const editar = await prisma.convidados.update({
            where:{id:Number(id)},
            data:{
                nome,
                email,
                telefone,
                status_checkin,
                usuarioid
            },
            select:{
                id:true,
                nome:true,
                email:true,
                telefone:true,
                criado_por:true,
                status_checkin:true
            }
        })
        return res.status(201).json(editar)
    }catch(error){
        return res.status(400).json({message:"Erro ao editar usuarios"})
    }
}

export async function DeleteOneConvidado(req: Request, res: Response) {
    const {id} = req.params
    try{
        const excluir = await prisma.convidados.delete({
            where:{id:Number(id)},
            select:{
                id:true,
                nome:true,
                email:true,
                telefone:true,
                criado_por:true,
                status_checkin:true
            }
        })
        return res.status(201).json(excluir)
    }catch(error){
        return res.status(400).json({message:"Erro ao excluir usuarios"})
    }
}