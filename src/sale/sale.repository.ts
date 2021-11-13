import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SaleDetail } from '../sale-detail/sale-detail.entity';
import { User } from 'src/user/user.entity';
import { Product } from '../product/product.entity';
import { BadRequestException } from '@nestjs/common';
import Decimal from 'decimal.js';

@EntityRepository(Sale)
export class SaleRepository extends Repository<Sale> {
  async createSale(createSaleDto: CreateSaleDto, user: User) {
    const {
      sale,
      sale_totalRetail,
      sale_date,
      sale_totalPayment,
      sale_user,
      sale_client,
      sale_paymentType,
      sale_saleState,
      sale_toDate
    } = createSaleDto;
    const total = new Decimal(sale_totalRetail).toFixed(2);
    const amount = new Decimal(sale_totalPayment).toFixed(2);
    // Validate date
    let newSale_toDate = sale_toDate ? this.getMaxDate(sale_toDate) : null;    
    await getConnection().transaction(async (transactionalEntityManager) => {
      const sales = this.create({
        sale,
        sale_totalRetail: +total,
        sale_totalPayment: +amount,
        sale_date,
        sale_user,
        sale_client,
        sale_paymentType,
        sale_saleState,
        sale_maxDate: newSale_toDate ? newSale_toDate.toISOString().split('T')[0] : null
      });
      sales.sale_user = user.user_ci;
      try {
        let saleEntity = await transactionalEntityManager.save(sales);
        
        for (const key in sale) {
          const saleDetail = new SaleDetail();
          if (sale.hasOwnProperty(key)) {

            saleDetail.sale = saleEntity;
            const product = await Product.findOne({
              where: { prod_name: sale[key].prod_name },
            });
            
            await transactionalEntityManager.decrement(Product, {prod_code: product.prod_code}, 'prod_quantity', sale[key].cant)
            saleDetail.sdt_quantity = sale[key].cant;
            saleDetail.sdt_salePrice = sale[key].price;
            saleDetail.product = product.prod_code;
            saleDetail.sdt_salePrice = sale[key].price;
          }
          transactionalEntityManager.save(saleDetail);
        }
      } catch (error) {
        console.log(error);
        
        throw new BadRequestException(error);
      }
    });
  }

  private getMaxDate(date: Date) {
    let maxDate = new Date();
    const dateMiliseconds = maxDate.setDate(new Date(date).getDate() + 7);
    return maxDate = new Date(dateMiliseconds);
  }

  async getSaleById(saleId: string) {
    const query = this.createQueryBuilder('sale')
    .leftJoinAndSelect('sale.sale', 'sale-detail')
    .leftJoinAndSelect('sale-detail.product', 'product')
    .select(['sale-detail','product.prod_name', 'product.prod_code','sale'])
    .where('sale.sale_id = :saleId', {saleId});
    return query.getOne();
  }

  async getSales(date: string) {
    const actualDate = new Date().toISOString().split('T')[0];    
    const query = this.createQueryBuilder('sale')
    .leftJoinAndSelect('sale.sale_client', 'client')
    .select(['sale', 'client.cli_firstName', 'client.cli_lastName']);
    query.where('sale_date = :date', {date: date});
    query.andWhere('sale_saleState = "DELIVERED"');
    return query.getMany();    
  }

  async getAlert() {
    const query = this.createQueryBuilder('sale');
    query.where('sale.sale_totalPayment < sale.sale_totalRetail');
    console.log(await query.getCount());
    
  }
}
