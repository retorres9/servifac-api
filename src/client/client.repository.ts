import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const { cli_ci, cli_firstName, cli_lastName, cli_debt, cli_phone } =
      createClientDto;
    const client = this.create({
      cli_ci,
      cli_firstName,
      cli_lastName,
      cli_phone,
      cli_debt,
    });
    
    //!! client.cli_debt = cli_debt ? cli_debt : 0.0; Review this code
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
    return client;
  }

  async updateClient(createClientDto: CreateClientDto): Promise<boolean> {
    const {
      cli_ci,
      cli_firstName,
      cli_lastName,
      cli_phone,
      cli_debt,
      cli_isActive,
    } = createClientDto;
    let updatedClient = await Client.findOne(cli_ci);
    if (!updatedClient) {
      throw new NotFoundException({ message: `Client with id ${cli_ci}` });
    }
    updatedClient.cli_firstName = cli_firstName;
    updatedClient.cli_lastName = cli_lastName;
    updatedClient.cli_phone = cli_phone;
    updatedClient.cli_debt = cli_debt;
    updatedClient.cli_isActive = cli_isActive;
    try {
      await updatedClient.save();
      return true;
    } catch (error) {
      throw new BadRequestException({
        message: 'Error while trying to update user',
      });
    }
  }

  getClient(clientId: string): Promise<Client> {
    const query = this.createQueryBuilder('client');
    query.where('cli_ci = :clientId', {clientId});    
    const user = query.getOne();
    if (!user) {
      throw new BadRequestException('Client not found!!!');
    }
    return user;
  }
}
