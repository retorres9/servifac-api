import { IsNotEmpty } from "class-validator";

export class CreateLocationDto {
    @IsNotEmpty({
        message: 'Location name shouldnt\'t be empty'
    })
    loc_name: string;
}