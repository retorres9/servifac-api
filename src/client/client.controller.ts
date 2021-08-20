import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';

@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Post()
    createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {        
        return this.clientService.createClient(createClientDto);
    }

    @Get('debtors')
    getDebtors(): Promise<Client[]> {
        return this.clientService.getDebtors();
    }

    @Get(':clientId')
    getClient(@Param('clientId') clientId: string): Promise<Client> {        
        return this.clientService.getClient(clientId);
    }
}
