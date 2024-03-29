import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { AccountType } from "./prov_account-type.enum";

export class CreateProviderDto {
    @MaxLength(13)
    @MinLength(13)
    @IsNotEmpty()
    prov_ruc: string;

    @MaxLength(20)
    @IsNotEmpty()
    prov_name: string;

    @IsNotEmpty()
    prov_accountName: string;

    @IsNotEmpty()
    prov_accountType: AccountType;

    @IsNotEmpty()
    prov_accountNumber: string;

    @IsNotEmpty()
    prov_debt: number;

    @MaxLength(11)
    prov_phone: string;
}

