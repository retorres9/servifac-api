import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './create-client.dto';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor(private clientRepository: ClientRepository) {}

    createClient(createClientDto: CreateClientDto): Promise<Client> {
        return this.clientRepository.createClient(createClientDto);
    }

    getDebtors(): Promise<Client[]> {
        return this.clientRepository.getDebtors();
    }

    getClient(clientId: string): Promise<Client> {
        return this.clientRepository.getClient(clientId);
    }

    getClientByQuery(query: string): Promise<Client[]> {
        return this.clientRepository.getClientByQuery(query);
    }

    getClientSummary(ci: string) {
        return this.clientRepository.getClientSummary(ci);
    }
}
