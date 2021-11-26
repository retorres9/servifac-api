import { EntityRepository, Repository } from 'typeorm';
import { Purchases } from './purchases.entity';
import { CreatePurchaseDto } from './models/create-purchase.model';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';

@EntityRepository(Purchases)
export class PurchaseRepository extends Repository<Purchases> {
    async postPurchase(createPurchase: CreatePurchaseDto) {
        const {pur_amount, pur_paid, pur_info, provider, user } =
            createPurchase;
        console.log(pur_amount);
        const dateToday = new Date().getTimezoneOffset();
        console.log(dateToday);
        const wer = new Date(Date.now() - dateToday).toLocaleString();
        const userId = await User.findOne(user);
        const providerId = await Provider.findOne(user);
        const purchase = this.create({
            pur_amount,
            pur_paid,
            pur_date: new Date(),
            pur_maxDate: new Date(),
            pur_info,
            user: userId,
            provider: providerId
        });
        console.log(purchase);
        
        
        
        
    }
}
