import { EntityRepository, Repository } from "typeorm"
import { Credit } from './credit.entity';
import { Sale } from '../sale/sale.entity';

@EntityRepository(Credit)
export class CreditRepository extends Repository<Credit> {
    async checkAvailability() {
        const querySales = Sale.createQueryBuilder();
        querySales.where('sale_totalPayment < sale_totalRetail');
        querySales.andWhere('cli_ci = 9999999999');
        let sales = (await querySales.getMany());
        let total = 0;sales.forEach(sale => {
            total = total + (sale.sale_totalRetail - sale.sale_totalPayment)
            return total;
        });
        
        const query = this.createQueryBuilder('credit');
        query.where('ClientCliCi = 9999999999');
        const credit = await query.getOne();
        let result
        total < credit.cre_amount ? result = true: result = false;
        return result;
        
    }
}