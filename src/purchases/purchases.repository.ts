import { EntityRepository, Repository } from 'typeorm';
import { Purchases } from './purchases.entity';
import { CreatePurchaseDto } from './models/create-purchase.model';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';
import { BadRequestException } from '@nestjs/common';
import { QueryPurchase } from './models/query-purchase.model';

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
        try {
            await purchase.save();            
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
}
