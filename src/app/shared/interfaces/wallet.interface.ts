
export interface WalletI {
    _id?: string
    alias: string
    sigla: string
    detalle: string
    dir: string
    tipo: number
    costo: number
    estado: boolean
    tag: string
    minimo: number
    maxRetiroB: number
    maxRetiroP: number
    maxRetiroO: number
    maxRetiroD: number
    createdAt: string
    updatedAt: string
}