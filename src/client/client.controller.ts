import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';
import { CreditAuth } from './models/credit-auth.dto';
import { ClientInfo } from './models/client-info.dto';

@Controller('client')
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

    // @Patch('credit')
    // postCreditAuth(@Body() auth: CreditAuth) {
    //     return this.clientService.postCreditAuth(auth);
    // }



}
