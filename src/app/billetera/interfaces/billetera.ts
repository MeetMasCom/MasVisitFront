export interface BilleteraUserI {
    _id?: string;
    userId?: string;
    detalle: string;
    dir: string;
    estado?: boolean;
    tipo: string;
    tag: string;
    alias: string;
    tipoWalletC?: string
}