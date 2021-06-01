import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    user_username: string;

    @IsNotEmpty()
    user_password: string;
}