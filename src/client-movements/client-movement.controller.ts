import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClientMovementDto } from './client-movement.dto';
import { ClientMovementService } from './client-movement.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('client-movement')
@UseGuards(AuthGuard())
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
