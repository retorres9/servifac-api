import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, getConnection, Like, Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.entity';
import { WarehouseStock } from '../warehouse-stock/warehouse-stock.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { ProductProvider } from './../product-provider/product-provider.entity';
import { ProductBarcode } from './productBarcode.model';
import { UpdateProdQtyDto } from './Model/update-product.dto';
import { Configuration } from './../configuration/configuration.entity';


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
        { prod_name: Like(`%${param}%`) },
        { prod_code: Like(`%${param}%`) }
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
    productSearched.prod_price = this.getPrice(Number(product.prod_price), product.prod_normalProfit, tax, product.prod_isTaxed);
    productSearched.prod_name = product.prod_name;
    productSearched.prod_isTaxed = product.prod_isTaxed;
    return productSearched;
  }

  async getProductsInventory(criteria: string, tax: number): Promise<Product[]> {
    const result = await this.find({
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

    });
    result.forEach(element => {
      element.prod_price = this.getPrice(element.prod_price, element.prod_normalProfit, tax, element.prod_isTaxed);
    });
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

  async updateProductQty(updateProdyQtyDto: UpdateProdQtyDto): Promise<Product> {
    const { prod_name, action, quantity } = updateProdyQtyDto;
    const query = this.createQueryBuilder('product');
    query.where(`product.prod_code = :prod_name`, { prod_name });
    const productUpdated = await query.getOne();
    if (action === 'add') {
      productUpdated.prod_quantity = Number(productUpdated.prod_quantity) + Number(quantity);
    } else if (action === 'sub') {
      productUpdated.prod_quantity = Number(productUpdated.prod_quantity) - Number(quantity);
    }
    await productUpdated.save();
    return productUpdated;
  }

  private getPrice(price: number, profit: number, tax: number, isTaxed: boolean) {
    let calcPrice;
    if (isTaxed) {
      calcPrice = Number(price) + price * ((Number(profit) + Number(tax)) / 100);
    } else {
      calcPrice = Number(price) + price * (Number(profit) / 100);
    }
    calcPrice = this.roundPrice(calcPrice);
    return calcPrice;
  }

  private roundPrice(price: number) {
    let stringPrice = typeof (price) === 'string' ? String(price).split('.') : String(price.toFixed(2)).split('.');
    let decimal;
    if (stringPrice[1] === undefined) {
      return price;
    }
    if (Number(stringPrice[1]) >= 95) {
      return Math.round(price);
    }
    +stringPrice[1] % 5 === 0
      ? (decimal = Number(stringPrice[1]))
      : (decimal = Number(Math.floor(Number(stringPrice[1]) / 5) * 5) + 5);
    let roundedPrice = `${stringPrice[0]}.${decimal}`;
    return +roundedPrice
  }
}
