import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePurchaseDto {
    @IsNumber()
    @IsNotEmpty()
    pur_amount: number;

    @IsOptional()
    pur_info: string;

    @IsNotEmpty()
    pur_maxDate: string;

    provider: string;
    user: string;
}