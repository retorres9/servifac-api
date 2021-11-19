import { IsDate, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';
import { MovementType } from './movement-type.enum';

export class createProviderMovementDto {
    // @IsNumber()
    @IsNotEmpty()
    pmv_amount: number;

    @IsNotEmpty()
    pmv_movement: MovementType;

    @IsOptional()
    @MinLength(10)
    pmv_description: string;

    @IsOptional()
    pmv_type: string;

    @IsNotEmpty()
    provider: string;
}