import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './create-provider.dto';
import { GetProviderName } from './get-roviderName.dto';

@Controller('provider')
export class ProviderController {
    constructor(private providerService: ProviderService) {}

    @Post()
    createProvider(@Body() createProviderDto: CreateProviderDto) {
        return this.providerService.createProvider(createProviderDto)
    }

    @Get()
    getproviders() {
        return this.providerService.getProviders();
    }

    @Get('combo')
    getProviderName(): Promise<GetProviderName> {
        return this.providerService.getProvidersName();
    }
}
