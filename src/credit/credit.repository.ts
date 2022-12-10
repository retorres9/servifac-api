import { EntityRepository, Repository } from "typeorm"
import { Credit } from './credit.entity';
import { Sale } from '../sale/sale.entity';
import { CreditAuth } from '../client/models/credit-auth.dto';
import { Client } from "src/client/client.entity";
import { User } from '../user/user.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Credit)
export class CreditRepository extends Repository<Credit> {
    async checkAvailability() {
        const querySales = Sale.createQueryBuilder();
        querySales.where('sale_totalPayment < sale_totalRetail');
        querySales.andWhere('cli_ci = 9999999999');
        let sales = (await querySales.getMany());
        let total = 0;
        sales.forEach(sale => {
            total = total + (sale.sale_totalRetail - sale.sale_totalPayment)
            return total;
        });

        const query = this.createQueryBuilder('credit');
        query.where('ClientCliCi = 9999999999');
        const credit = await query.getOne();
        let result;
        total < credit.cre_amount ? result = true : result = false;
        return result;

    }

    async postCreditAuthorization(creditAuth: CreditAuth): Promise<boolean> {
        const { userId, amount } = creditAuth;
        const query = this.createQueryBuilder('credit');
        let creditStatus;

        query.where('clientCliCi = :id', { id: userId })
        const credit = await query.getOne();
        const client = await Client.findOne(userId);
        const user = await User.findOne("1105970717");
        if (!user || !client || !amount) {
            throw new BadRequestException();
        }
        if (credit) {
            const creditInfo = this.create({ cre_id: credit.cre_id, client, cre_amount: amount, user });

            creditStatus = await creditInfo.save();
        } else {
            const creditInfo = this.create({ user, cre_amount: amount, client });
            creditStatus = await creditInfo.save();
        }
        return creditStatus ? true : false;
    }
}