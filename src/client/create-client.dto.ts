import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateClientDto {
    @IsNotEmpty({
        message: 'First name should not be empty'
    })
    cli_firstName: string;

    @IsNotEmpty({
        message: 'Last name should not be empty'
    })
    cli_lastName: string;

    @IsNotEmpty({
        message: 'CI should not be empty'
    })
    cli_ci: string;

    @IsOptional()
    cli_email: string;

    @IsNotEmpty({
        message: 'Phone should not be empty'
    })
    cli_phone: string;

    @IsNotEmpty({
        message: 'Address should not be empty'
    })
    cli_address: string;

    @IsNumber()
    @IsOptional()
    cli_debt?: number;

    @IsOptional()
    cli_isActive?: boolean;

    cli_credit: number;
}