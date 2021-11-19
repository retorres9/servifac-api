import { Injectable } from '@nestjs/common';
import { createProviderMovementDto } from './create-providerMovement.dto';
import { ProviderMovementRepository } from './provider-movement.repository';

@Injectable()
export class ProviderMovementService {
    constructor(private pmvRepository: ProviderMovementRepository) {
        
    }
    postProviderMovement(provMovement: createProviderMovementDto) {
        return this.pmvRepository.postProviderMovement(provMovement);
    }
}
