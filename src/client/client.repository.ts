import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, getConnection, Like, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';
import { CreditAuth } from './models/credit-auth.dto';
import { Credit } from '../credit/credit.entity';
import { ClientInfo } from './models/client-info.dto';

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
      cli_credit,
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

    await getConnection().transaction(async (transactionalEntityManager) => {
      try {
        const clientSaved = await transactionalEntityManager.save(client);
        if (cli_credit) {
          const credit = new Credit();
          credit.client = clientSaved;
          credit.cre_amount = cli_credit;
          await transactionalEntityManager.save(credit);
        }
      } catch (error) {
        throw new BadRequestException(error);
      }
    });
    return client;
  }

  async getDebtors(): Promise<Client[]> {
    const query = this.createQueryBuilder('client');
    query.andWhere('cli_debt > 0');
    query.orderBy('cli_firstName', 'ASC');
    return query.getMany();
  }

  async updateClient(createClientDto: CreateClientDto): Promise<Client> {
    const {
      cli_ci,
      cli_firstName,
      cli_lastName,
      cli_debt,
      cli_phone,
      cli_email,
      cli_address,
      cli_credit,
    } = createClientDto;
    console.log(cli_debt);
    
    let updatedClient = await Client.findOne(cli_ci);
    if (!updatedClient) {
      throw new NotFoundException({
        message: `Client with id ${cli_ci} does not exist`,
      });
    }
    const updatedUser = this.create({
      cli_ci,
      cli_firstName,
      cli_lastName,
      cli_phone,
      cli_debt,
      cli_email,
      cli_address,
    });
    await getConnection().transaction(async (transactionManager) => {
      try {
        const client = await transactionManager.save(updatedUser);
        if (cli_credit) {
          const clientCredit = new Credit();
          clientCredit.cre_amount = cli_credit;
          clientCredit.client = client;
          await transactionManager.save(clientCredit);
        }
      } catch (error) {
        throw new BadRequestException({
          message: 'Error while trying to update user',
        });
      }
    });
    return updatedUser;
  }

  async getClient(clientId: string): Promise<ClientInfo> {
    const clientInfo = new ClientInfo();
    const query = this.createQueryBuilder('client')
      .leftJoinAndSelect('client.credit', 'credit')
      .leftJoinAndSelect('client.sale', 'sale');
    query.where('client.cli_ci = :clientId', { clientId });
    const client: Client = await query.getOne();

    let total = 0;
    if (client) {
      for (const key in client.sale) {
        if (client.sale.hasOwnProperty(key)) {
          total =
            total +
            (client.sale[key].sale_totalRetail -
              client.sale[key].sale_totalPayment);
        }
      }
      delete client.sale;
    }

    clientInfo.client = client;

    clientInfo.debt = total;

    if (Object.entries(client.credit).length > 0) {
      clientInfo.credit = client.credit[0].cre_amount;
    } else {
      clientInfo.credit = 0;
    }
    // clientInfo.credit = client.credit !== undefined ? client.credit[0].cre_amount : 0;
    delete client.credit;
    if (!client) {
      throw new BadRequestException('Client not found!!!');
    }
    return clientInfo;
  }

  getClientByQuery(query: string): Promise<Client[]> {
    const users = this.find({
      where: [
        { cli_firstName: Like(`%${query}%`) },
        { cli_lastName: Like(`%${query}%`) },
        { cli_ci: Like(`${query}`) },
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
      .leftJoinAndSelect('client.credit', 'credit')
      .select([
        'sale.sale_id',
        'sale.sale_date',
        'sale.sale_totalRetail',
        'sale.sale_totalPayment',
        'sale.sale_maxDate',
        'client',
        'credit',
      ])
      .where('client.cli_ci = :client_ci', { client_ci: ci });
    return query.getOne();
  }
}
