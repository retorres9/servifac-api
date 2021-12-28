import { EntityRepository, Repository } from 'typeorm';
import { ProviderMovement } from './provider-movement.entity';
import { createProviderMovementDto } from './create-providerMovement.dto';
import { Provider } from 'src/provider/provider.entity';
import { User } from '../user/user.entity';
import { Purchases } from '../purchases/purchases.entity';
import Decimal from 'decimal.js';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(ProviderMovement)
export class ProviderMovementRepository extends Repository<ProviderMovement> {
    async postProviderMovement(
        createPMDto: createProviderMovementDto,
    ): Promise<ProviderMovement> {
        let { pmv_amount, pmv_movement, pmv_description, provider, pmv_type } =
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
            if (pmv_movement === 'PAGO') {
                const purchases = Purchases.createQueryBuilder('purchases');
                purchases.where('purchases.pur_amount > purchases.pur_paid');
                purchases.andWhere('purchases.pur_ruc = :provider', {provider})
                purchases.orderBy('purchases.pur_date', 'ASC');
                // ! Check order of purchases payment must pay the oldest first
                const selectedPurchases =  await purchases.getMany();
                let amount = pmv_amount;
                let purchasesEdited = selectedPurchases.map(purchases => {
                    let reduction = new Decimal(purchases.pur_amount).minus(new Decimal(purchases.pur_paid));
                    if (+new Decimal(reduction) <= +new Decimal(amount) && amount > 0) {
                        amount -= +reduction;
                        purchases.pur_paid = purchases.pur_amount;
                    } else {
                        let totalPaid = purchases.pur_paid === 0 ? Number(Math.round(purchases.pur_paid)) : Number(purchases.pur_paid);
                        amount = amount < 0 ? amount = 0 : amount;
                        purchases.pur_paid = +new Decimal(totalPaid).plus(new Decimal(amount));
                        amount = 0;
                    }
                    return purchases;
                })
                Purchases.save(purchasesEdited);
                
            }
            try {
                await transaction.save();
                delete transaction.pmv_user;
                delete transaction.provider;
                return transaction;
            } catch (error) {
                throw new BadRequestException();
            }
        }
        
    }

    async getProviderMovements(queryobject) {
        const query = this.createQueryBuilder('pmv');
        query.where('pmv.provider = :ruc', {ruc: queryobject.provider})
        if (queryobject.type !== 'ALL') {
            query.andWhere('pmv.pmv_movement = :action', {action: queryobject.type});
        }
        query.orderBy('pmv.pmv_date', 'DESC');
        return query.getMany();
    }
}
