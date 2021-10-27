import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SaleDetail } from '../sale-detail/sale-detail.entity';
import { User } from 'src/user/user.entity';
import { Product } from '../product/product.entity';
import { BadRequestException } from '@nestjs/common';

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
      sale_saleState
    } = createSaleDto;
    console.log(createSaleDto);
    

    await getConnection().transaction(async (transactionalEntityManager) => {
      console.log(sale_date);
      const sales = this.create({
        sale,
        sale_totalRetail,
        sale_totalPayment,
        sale_date,
        sale_user,
        sale_client,
        sale_paymentType,
        sale_saleState
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

  async getSaleById(saleId: string) {
    const query = this.createQueryBuilder('sale')
    .leftJoinAndSelect('sale.sale', 'sale-detail')
    .leftJoinAndSelect('sale-detail.product', 'product')
    .select(['sale-detail','product.prod_name', 'product.prod_code','sale'])
    .where('sale.sale_id = :saleId', {saleId});
    console.log(query.getSql());
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
}
