import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, getConnection, Like, Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.entity';
import { WarehouseStock } from '../warehouse-stock/warehouse-stock.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { ProductProvider } from './../product-provider/product-provider.entity';
import { ProductBarcode } from './productBarcode.model';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  prodOutput: ProductBarcode;
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      prod_code,
      prod_name,
      prod_price,
      prod_wholesaleProfit,
      prod_normalProfit,
      prod_quantity,
      prod_minQuantity,
      war_id,
      wrs_quantity,
      cat_id,
      loc_id,
      ppr_productProvider,
    } = createProductDto;
    console.log(ppr_productProvider);

    const prodFound = await this.findOne(prod_code);

    if (prodFound) {
      throw new BadRequestException(
        `El código '${prod_code}' ya se encuentra asignado a otro producto`,
      );
    }
    const product = new Product();
    product.prod_code = prod_code;
    product.prod_name = prod_name;
    product.prod_price = prod_price;
    product.prod_normalProfit = prod_normalProfit;
    product.prod_wholesaleProfit = prod_wholesaleProfit;
    product.prod_minQuantity = prod_minQuantity;
    product.prod_quantity = prod_quantity;
    // Warehouse getting
    if (war_id) {
      const warehouse = await Warehouse.findOne(war_id);
      // ! Handle if warehouse does not exist
      // ? Use create instead of build the warehouse object
      let warehouseStock = new WarehouseStock();
      warehouseStock.warehouses = warehouse;
      warehouseStock.wrs_quantity = wrs_quantity;
      warehouseStock.products = product;
      warehouseStock = WarehouseStock.create(warehouseStock);

      product.warehouseStock = [warehouseStock];
      delete warehouseStock.products;
    }

    // Category
    product.category = cat_id;
    // Location
    product.location = loc_id;
    // ? More than one product provider should be handled
    const pp = new ProductProvider();
    pp.ppr_product = prod_code;

    pp.ppr_provider = ppr_productProvider;
    console.log(pp);
    await getConnection().transaction(async (transactionalEntityManager) => {
      try {
        await transactionalEntityManager.save(product);
        await transactionalEntityManager.save(pp);
      } catch (e) {
        throw new BadRequestException('Error en la transaccion', e);
      }
    });
    return product;
  }

  async getProducts(param): Promise<Product[]> {
    const prodsFilterd = this.find({
      where: [
        {prod_name: Like(`%${param}%`)},
        {prod_code: Like(`%${param}%`)}
      ]
    })

    return prodsFilterd;
  }

  async getProductBarcode(prod_code, tax): Promise<ProductBarcode> {
    const query = this.createQueryBuilder('product');
    query.select([
      'product.prod_name',
      'product.prod_price',
      'product.prod_isTaxed',
      'product.prod_normalProfit',
    ]);
    query.where(`product.prod_code = :prod_code`, { prod_code });
    let product = await query.getOne();
    if (!product) {
      throw new NotFoundException();
    }
    const productSearched = new ProductBarcode();
    productSearched.prod_price = this.getPrice(Number(product.prod_price), product.prod_normalProfit, tax);
    productSearched.prod_name = product.prod_name;
    productSearched.prod_isTaxed = product.prod_isTaxed;
    return productSearched;
  }

  async  getProductsInventory(criteria: string): Promise<Product[]> {
    const result = this.find({
      where: [
        {
          prod_name: Like(`%${criteria}%`)
        },
        {
          prod_code: Like(`%${criteria}%`)
        }
      ],
      order: 
        {
          prod_name: 'ASC'
        }
      
    })
    return result;
  }

  async getProductWarning(): Promise<boolean> {
    const query = this.createQueryBuilder('product');
    query.where('prod_quantity < prod_minQuantity');
    const result = await query.getMany();
    return result.length > 0 ? true : false;
  }

  async getProductMinimums(): Promise<Product[]> {
    const query = this.createQueryBuilder('product');
    query.where('prod_quantity < prod_minQuantity');
    return query.getMany();
    
  }

  private getPrice(price: number, normalProfit: number, tax: number) {
    return price + price * (normalProfit / 100 + tax /100);
  }
}
