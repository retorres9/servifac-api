import { IsDate, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { MovementType } from './movement-type.enum';

export class createProviderMovementDto {
    @IsNumber()
    @IsNotEmpty()
    pmv_amount: number;

    @IsDate()
    pmv_date: Date;
    
    pmv_movement: MovementType;
    @MinLength(10)
    pmv_description: string;
}