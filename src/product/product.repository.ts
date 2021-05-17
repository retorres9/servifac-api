import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.entity';
import { WarehouseStock } from '../warehouse-stock/warehouse-stock.entity';
import { Warehouse } from '../warehouse/warehouse.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const {prod_code, prod_name, prod_price, prod_quantity, war_id, wrs_quantity, cat_id} = createProductDto;
        const product = new Product();
        product.prod_code = prod_code;
        product.prod_name = prod_name;
        product.prod_price = parseFloat(prod_price);
        product.prod_quantity = parseInt(prod_quantity);
        // Warehouse getting
        const warehouse = await Warehouse.findOne(war_id);
        
        let warehouseStock = new WarehouseStock();
        warehouseStock.warehouses = warehouse;
        // Llamar a warehouse obtener su objeto y enviarlo
        warehouseStock.wrs_quantity = wrs_quantity;
        warehouseStock.products = product;
        warehouseStock = await WarehouseStock.create(warehouseStock);
        
        product.warehouseStock = [warehouseStock];
        // Category
        product.category = cat_id;
        await product.save()
        delete warehouseStock.products;
        return product;
    }
}