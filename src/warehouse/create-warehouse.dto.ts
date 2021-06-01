import { IsNotEmpty } from "class-validator";

export class CreateWarehouseDto {
    @IsNotEmpty({
        message: 'Warehouse name shouldn\'t be empty'
    })
    war_name: string;
}