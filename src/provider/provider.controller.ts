import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './create-provider.dto';
import { GetProviderName } from './get-roviderName.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('provider')
@UseGuards(AuthGuard())
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

    @Get('/:providerRuc')
    getProvider(@Param('providerRuc') ruc: string) {
        return this.providerService.getProvider(ruc);
    }
}
