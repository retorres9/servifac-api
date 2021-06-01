import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSaleDto {
    @IsNumber()
    @IsNotEmpty()
    sale_totalAmount: number;

    @IsNumber()
    @IsNotEmpty()
    sale_totalPayment: number;

    @IsDate()
    @IsNotEmpty()
    sale_date: Date;
    
}