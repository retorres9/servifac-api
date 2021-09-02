import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { Sale } from "./sale.entity";

export class CreateSaleDto {
    @IsNumber()
    @IsNotEmpty()
    sale_totalRetail: number;

    @IsNumber()
    @IsNotEmpty()
    sale_totalPayment: number;

    // @IsDate()
    // @IsNotEmpty()
    // sale_date: Date;

    sale: Sale;

    sale_client: string;

    sale_user: string;

    
}