import { EntityRepository, Repository } from 'typeorm';
import { Purchases } from './purchases.entity';
import { CreatePurchaseDto } from './models/create-purchase.model';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';
import { BadRequestException } from '@nestjs/common';
import { QueryPurchase } from './models/query-purchase.model';
import { ProviderMovement } from '../provider-movement/provider-movement.entity';
import { MovementType } from 'src/provider-movement/movement-type.enum';

@EntityRepository(Purchases)
export class PurchaseRepository extends Repository<Purchases> {
    async postPurchase(createPurchase: CreatePurchaseDto) {
        const { pur_amount, pur_info, provider, user, pur_maxDate } =
        createPurchase;
        const userId = await User.findOne(user);
        const providerId = await Provider.findOne(user);
        const purchase = this.create({
            pur_amount,
            pur_date: new Date(),
            pur_maxDate: pur_maxDate,
            pur_info,
            user: userId,
            provider: providerId,
        });
        const pmv = ProviderMovement.create({
            pmv_amount: pur_amount,
            pmv_movement: MovementType.CREDITO,
            pmv_description: pur_info,
            pmv_date: new Date().toISOString().split('T')[0],
            provider: providerId
        })
        try {
            await purchase.save();            
            await pmv.save();
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async getPurchases(query: QueryPurchase) {
        const { from, to } = query;        
        const querySQL = this.createQueryBuilder('purchases');
        querySQL.where(
            'purchases.pur_date BETWEEN CAST(:from AS DATE) AND CAST(:to AS DATE)'
            , {from, to}
        );
        return querySQL.getMany();
    }

    async getPurchasesAlarm(query: Query): Promise<number | Purchases[]> {
        const today = new Date().toISOString().split('T')[0];
        const queryPurchases = this.createQueryBuilder('purchases');
        queryPurchases.leftJoinAndSelect('purchases.provider', 'provider');
        queryPurchases.where('purchases.pur_amount > purchases.pur_paid');
        queryPurchases.andWhere('CAST (:today as DATE) >= CAST (purchases.pur_maxDate as DATE)', {today})        
        if (query.select) {
            return queryPurchases.getMany()
        } else {
            return queryPurchases.getCount();
        }
    }
}

interface Query {
    select: string;
}