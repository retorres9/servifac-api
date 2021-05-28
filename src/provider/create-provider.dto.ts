import { AccountType } from "./prov_account-type.enum";

export class CreateProviderDto {
    prov_ruc: string;
    prov_name: string;
    prov_accountName: string;
    prov_accountType: AccountType;
    prov_accountNumber: string;
    prov_debt: number;
    prov_phone: string;
}

