import { EntityRepository, Repository } from "typeorm";
import { WarehouseStock } from './warehouse-stock.entity';
import { CreateWarehouseStockDto } from './create-warehouse-stock.dto';
import { Warehouse } from '../warehouse/warehouse.entity';
import { WarehouseService } from '../warehouse/warehouse.service';
import { InjectRepository } from "@nestjs/typeorm";
import { WarehouseRepository } from '../warehouse/warehouse.repository';

@EntityRepository(WarehouseStock)
export class WarehouseStockRespository extends Repository<WarehouseStock> {
    constructor(
        @InjectRepository(WarehouseRepository)
        private readonly warehouseRepository: Repository<Warehouse>,
        private warehouseService: WarehouseService) {
        super();
    }
    async createWarehouseStock(createWarehouseStockDto: CreateWarehouseStockDto): Promise<WarehouseStock> {
        const {war_id, wrs_quantity} = createWarehouseStockDto;
        let warehouse: Warehouse;        
        warehouse = await Warehouse.findOne(war_id);
        const warehouseStock = new WarehouseStock();
        warehouseStock.wrs_quantity = parseInt(wrs_quantity);
        warehouseStock.warehouses = warehouse;
        try {
            return await warehouseStock.save();            
        } catch (error) {
            console.log(error);
            
        }
    }
}