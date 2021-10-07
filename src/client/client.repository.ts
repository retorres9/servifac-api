import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Like, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const {
      cli_ci,
      cli_firstName,
      cli_lastName,
      cli_debt,
      cli_phone,
      cli_email,
      cli_address,
    } = createClientDto;

    const clientFound = await this.findOne(cli_ci);

    if (clientFound) {
      throw new BadRequestException(
        `El cliente con cédula '${cli_ci}' ya está registrado`,
      );
    }
    const client = this.create({
      cli_ci,
      cli_firstName,
      cli_lastName,
      cli_phone,
      cli_debt,
      cli_email,
      cli_address,
    });

    try {
      await client.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
    return client;
  }

  async getDebtors(): Promise<Client[]> {
    const query = this.createQueryBuilder('client');
    query.andWhere('cli_debt > 0');
    query.orderBy('cli_firstName', 'ASC');
    return query.getMany();
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
      throw new NotFoundException({
        message: `Client with id ${cli_ci} does not exist`,
      });
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
    query.where('cli_ci = :clientId', { clientId });
    const user = query.getOne();
    if (!user) {
      throw new BadRequestException('Client not found!!!');
    }
    return user;
  }

  getClientByQuery(query: string): Promise<Client[]> {
    const users = this.find({
      where: [
        { cli_firstName: Like(`%${query}%`) },
        { cli_lastName: Like(`%${query}%`) },
        { cli_ci: Like(`${query}`)}
      ],
      order: {
        cli_lastName: 'ASC',
        cli_firstName: 'ASC',
      },
    });

    try {
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async getClientSummary(ci: string) {
    const query = this.createQueryBuilder('client')
      .leftJoinAndSelect('client.sale', 'sale')
      .select(['sale.sale_id', 'sale.sale_date', 'sale.sale_totalRetail', 'client'])
      .where('client.cli_ci = :client_ci', { client_ci: ci });
    return query.getOne();
  }
}