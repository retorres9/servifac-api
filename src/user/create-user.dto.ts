import { IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @Length(10, 10,{
        message: 'Ci length must be 10 characters'
    })
    user_ci;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    user_firstName;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    user_lastName;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    user_username;
    
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    user_password;

    @IsString()
    user_role;
}