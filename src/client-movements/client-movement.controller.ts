import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientMovementDto } from './client-movement.dto';
import { ClientMovementService } from './client-movement.service';

@Controller('client-movement')
export class ClientMovementController {
    constructor(private clientMovementService: ClientMovementService) {}

    @Get(':ci')
    getClientHistory(@Param('ci') client_ci: string) {
        return this.clientMovementService.getClientHistory(client_ci);
    }

    @Post()
    postMovements(@Body() cliMovementDto: ClientMovementDto) {
        return this.clientMovementService.postMovement(cliMovementDto);
    }
}
