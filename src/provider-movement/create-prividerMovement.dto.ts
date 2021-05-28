import { MovementType } from './movement-type.enum';

export class createProviderMovementDto {
    pmv_amount: number;
    pmv_date: Date;
    pmv_movement: MovementType;
    pmv_description: string;
}