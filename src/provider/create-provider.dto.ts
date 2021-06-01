import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";
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

    @IsNumber()
    prov_debt: number;

    
    prov_phone: string;
}

