export interface CreateClientDto {
    cli_firstName: string;
    cli_lastName: string;
    cli_ci: string;
    cli_phone: string;
    cli_debt?: number;
}