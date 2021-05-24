import { EntityRepository, Repository } from "typeorm";
import { Client } from './client.entity';
import { CreateClientDto } from "./create-client.dto";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
    async createClient(createClientDto: CreateClientDto): Promise<Client> {
        const {cli_ci, cli_firstName, cli_lastName, cli_debt, cli_phone} = createClientDto;
        const client = new Client();
        client.cli_ci = cli_ci;
        client.cli_firstName = cli_firstName;
        client.cli_lastName = cli_lastName;
        client.cli_phone = cli_phone;
        client.cli_debt =  cli_debt ? cli_debt : 0.000 ;
        try {
            await client.save();
            return client;
        } catch (error) {
            console.log(error);
        }
    }

    async getDebtors(): Promise<Client> {
        let client = new Client();
        const query = this.createQueryBuilder('client');
        query.andWhere('client.cli_debt > 0');
        client = await query.execute();
        return client;
    }
}