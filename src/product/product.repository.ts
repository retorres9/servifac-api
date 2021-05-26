import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.entity';
import { WarehouseStock } from '../warehouse-stock/warehouse-stock.entity';
import { Warehouse } from '../warehouse/warehouse.entity';
import { ProductProviderRepository } from '../product-provider/product-provider.repository';
import { ProductProvider } from './../product-provider/product-provider.entity';
import { CreateProductProviderDto } from './../product-provider/create-product-provider.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const {prod_code, prod_name, prod_price, prod_quantity, war_id, wrs_quantity, cat_id, loc_id, ppr_productProvider} = createProductDto;
        const product = new Product();
        product.prod_code = prod_code;
        product.prod_name = prod_name;
        product.prod_price = parseFloat(prod_price);
        product.prod_quantity = parseInt(prod_quantity);
        // Warehouse getting
        if (war_id) {
            const warehouse = await Warehouse.findOne(war_id);
            let warehouseStock = new WarehouseStock();
            warehouseStock.warehouses = warehouse;
            warehouseStock.wrs_quantity = wrs_quantity;
            warehouseStock.products = product;
            warehouseStock = await WarehouseStock.create(warehouseStock);
            
            product.warehouseStock = [warehouseStock];
            delete warehouseStock.products;            
        }
        
        // Category
        product.category = cat_id;
        // Location
        product.location = loc_id;
        await product.save();


        for (const providerRuc of ppr_productProvider) {
            const pp = new ProductProvider();
            pp.ppr_product = prod_code;
            
            pp.ppr_provider = providerRuc;
            console.log(pp);
            
            await pp.save();
            
        }
        // await ppr_productProvider.map(async function(providerRuc) {
        // });
        return product;
    }

    getProducts() {
        const query = this.createQueryBuilder('product')
        .leftJoinAndSelect('product.category','category')
        .leftJoinAndSelect('product.warehouseStock','warehouseStock')
        .leftJoinAndSelect('warehouseStock.warehouses', 'warehouse')
        .leftJoinAndSelect('product.ppr_provider','product_provider')
        .leftJoinAndSelect('product_provider.ppr_provider', 'provider')
        .select(['product.prod_name', 'product_provider', 'provider.prov_ruc']);
        return query.getMany();
    }
}