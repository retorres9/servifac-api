export interface UserCashRegister {
    user_ci: string;
    user_firstName: string;
    user_lastName: string;
    user_username: string;
    user_password: string;
    user_role: string;
    user_isActive: boolean;
    user_email: string;
    user_tempPass: string;
    user_sale: UserSale[];
}

export interface UserSale {
    sale_id: number;
    sale_totalRetail: string;
    sale_totalPayment: string;
    sale_date: Date;
    sale_paymentType: SalePaymentType;
    sale_saleState: SaleSaleState;
    sale_store: number;
    sale_maxDate: null;
}

export enum SalePaymentType {
    Efectivo = "Efectivo",
}

export enum SaleSaleState {
    Delivered = "DELIVERED",
}
