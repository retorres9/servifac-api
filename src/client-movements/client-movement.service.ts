import { Injectable } from '@nestjs/common';
import { ClientMovementDto } from './client-movement.dto';
import { ClientMovementRespository } from './client-movement.repository';

@Injectable()
export class ClientMovementService {
    constructor(private clientMoveRepository: ClientMovementRespository) {}

    postMovement(cliMovementDto: ClientMovementDto) {
        return this.clientMoveRepository.postMovement(cliMovementDto);
    }
}
