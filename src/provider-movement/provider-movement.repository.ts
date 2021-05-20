import { EntityRepository, Repository } from "typeorm";
import { ProviderMovement } from './provider-movement.entity';
import { createProviderMovementDto } from './create-prividerMovement.dto';

@EntityRepository(ProviderMovement)
export class ProviderMovementRepository extends Repository<ProviderMovement> {
    async createProvider(createPMDto: createProviderMovementDto): Promise<ProviderMovement> {
        const {pmv_amount, pmv_movement, pmv_description} = createPMDto;
        const providerMovement = new ProviderMovement();
        providerMovement.pmv_amount = pmv_amount;
        providerMovement.pmv_movement = pmv_movement;
        providerMovement.pmv_description = pmv_description;
        try {
            await providerMovement.save();
            return providerMovement;
        } catch (error) {
            console.log(error);
        }
    }
}