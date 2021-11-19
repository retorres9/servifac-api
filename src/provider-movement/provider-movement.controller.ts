import { Body, Controller, Post } from '@nestjs/common';
import { createProviderMovementDto } from './create-providerMovement.dto';
import { ProviderMovementService } from './provider-movement.service';

@Controller('provider-movement')
export class ProviderMovementController {
    constructor(private pmvService: ProviderMovementService) {
        
    }
    @Post()
    postProviderMovement(@Body() createProvMov: createProviderMovementDto) {
        console.log(createProvMov);
        return this.pmvService.postProviderMovement(createProvMov);
    }
}
