import type { Status } from "../../generated/prisma/enums.js"

export interface CriarConvidado{
    nome: string
    email: string
    telefone: string
    status_checkin: Status
    usuarioid: number
}

export interface UpdateConvidado extends Partial<CriarConvidado> {}