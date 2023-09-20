export interface RechargeI {
    dir: string
    file: string
    hash: string
    amount: number
    detail: string
    remark?: string
    walletId: string
    userId: string;
    status: number;
    statusDetail?: string;
    user?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
}

export interface ReviewRechargeI {
    id: string;
    remark: string;
    value: number;
    status: number;
}

export interface BalanceUserI {
    _id?: string;
    walletId: string;
    userId: string;
    balance: number;
    alias: string;
    sigla: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RecordsI {
    _id: string;
    walletId: string;
    userId: string;
    detail: string;
    typeTransaction: string;
    referValue: number;
    companyValue: number;
    value: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}
;
export interface RetreatI {
    _id?: string
    userId: string
    userName?: string
    walletId: string;
    statusDetail?: string;
    amount: number;
    remark?: string;
    file?: string;
    status?: number; // 0 enviado, 1 aprobado, 2 rechazado
    createdAt?: string;
    updatedAt?: string;
}

export interface ReviewRetreatI {
    id: string;
    remark: string;
    value: number;
    status: number;
    file: string;
}
