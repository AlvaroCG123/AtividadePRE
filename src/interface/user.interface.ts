import type { Perfil } from "../../generated/prisma/enums.js"


export interface CriarUsuario{
    nome: string
    email: string
    senha: string
    perfil: Perfil
}

export interface Login{
    email: string
    senha: string
}

export interface UpdateUsuario extends Partial<CriarUsuario> {}