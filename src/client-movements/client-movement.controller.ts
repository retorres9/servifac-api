import { Body, Controller, Post } from '@nestjs/common';
import { ClientMovementDto } from './client-movement.dto';
import { ClientMovementService } from './client-movement.service';

@Controller('client-movement')
export class ClientMovementController {
    constructor(private clientMovementService: ClientMovementService) {}

    @Post()
    postMovement(@Body() cliMovementDto: ClientMovementDto) {
        return this.clientMovementService.postMovement(cliMovementDto);
    }
}
