import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';
import { ClientInfo } from './models/client-info.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('client')
@UseGuards(AuthGuard())
export class ClientController {
    constructor(private clientService: ClientService) {}
    
    @Get()
    getClientByQuery(@Query('name') name: string): Promise<Client[]> {        
        return this.clientService.getClientByQuery(name);
    }
    
    @Post()
    createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {        
        return this.clientService.createClient(createClientDto);
    }

    @Patch()
    postCreditAuth(@Body() createClient: CreateClientDto) {
        return this.clientService.updateClient(createClient);
    }
    
    @Get(':clientId')
    getClient(@Param('clientId') clientId: string): Promise<ClientInfo> {        
        return this.clientService.getClient(clientId);
    }
    
    @Get('debtors')
    getDebtors(): Promise<Client[]> {
        return this.clientService.getDebtors();
    }

    @Get('summary/:clientId')
    getClientSummary(@Param('clientId')ci: string) {        
        return this.clientService.getClientSummary(ci);
    }
}
