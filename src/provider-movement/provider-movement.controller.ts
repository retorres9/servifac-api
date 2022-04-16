import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { createProviderMovementDto } from './create-providerMovement.dto';
import { ProviderMovementService } from './provider-movement.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('provider-movement')
@UseGuards(AuthGuard())
export class ProviderMovementController {
    constructor(private pmvService: ProviderMovementService) {}
    
    @Post()
    postProviderMovement(@Body() createProvMov: createProviderMovementDto) {
        return this.pmvService.postProviderMovement(createProvMov);
    }

    @Get()
    getProviderMovements(@Query() queryObject: any) {
        return this.pmvService.getProviderMovements(queryObject);
    }
}
