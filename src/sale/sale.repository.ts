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
    console.log(user);

    const {
      sale,
      sale_totalRetail,
      sale_totalPayment,
      sale_user,
      sale_client,
    } = createSaleDto;

    const sales = this.create({
      sale,
      sale_totalRetail,
      sale_totalPayment,
      sale_date: new Date().toLocaleDateString('ec-ES'),
      sale_user,
      sale_client,
    });

    await getConnection().transaction(async (transactionalEntityManager) => {
      try {
        let saleEntity = await transactionalEntityManager.save(sales);
        for (const key in sale) {
          const saleDetail = new SaleDetail();
          if (sale.hasOwnProperty(key)) {

            saleDetail.sale = saleEntity;
            const product = await Product.findOne({
              where: { prod_name: sale[key].prod },
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
        throw new BadRequestException(error);
      }
    });
  }
}
