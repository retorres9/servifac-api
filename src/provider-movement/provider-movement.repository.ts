import { EntityRepository, Repository } from 'typeorm';
import { ProviderMovement } from './provider-movement.entity';
import { createProviderMovementDto } from './create-providerMovement.dto';
import { Provider } from 'src/provider/provider.entity';
import { User } from '../user/user.entity';

@EntityRepository(ProviderMovement)
export class ProviderMovementRepository extends Repository<ProviderMovement> {
    async postProviderMovement(
        createPMDto: createProviderMovementDto,
    ): Promise<ProviderMovement> {
        const { pmv_amount, pmv_movement, pmv_description, provider, pmv_type } =
        createPMDto;
        const providerEntity = await Provider.findOne(provider);
        const today = new Date().getTimezoneOffset();
        const todayIso = new Date(Date.now() - today).toISOString();
        
        
        const user = await User.findOne('1105970717');
        if (providerEntity && user) {
            const transaction = this.create({
                pmv_amount,
                pmv_movement,
                pmv_description,
                pmv_date: todayIso,
                pmv_user: user,
                provider: providerEntity,
                pmv_type: pmv_type ? pmv_type : null
            })            
            console.log(transaction);
            try {
                await transaction.save();
                delete transaction.pmv_user;
                delete transaction.provider;
                return transaction;
            } catch (error) {
                console.log(error);
            }
        }
        
    }
}
