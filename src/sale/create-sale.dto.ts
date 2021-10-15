import { IsNotEmpty, IsNumber } from "class-validator";
import { Sale } from "./sale.entity";
import { SaleType } from './enums/sale-type.enum';
import { SaleState } from "./enums/sale-state.enum";

export class CreateSaleDto {
    @IsNumber()
    @IsNotEmpty()
    sale_totalRetail: number;

    @IsNumber()
    @IsNotEmpty()
    sale_totalPayment: number;

    // @IsNotEmpty()
    sale_date: Date;

    @IsNotEmpty()
    sale: Sale;

    @IsNotEmpty()
    sale_client: string;

    @IsNotEmpty()
    sale_user: string;

    sale_paymentType: SaleType;

    sale_saleState: SaleState;

    // ! Missing store id
}