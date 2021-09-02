import { EntityRepository, Repository } from "typeorm";
import { WarehouseStock } from './warehouse-stock.entity';
import { CreateWarehouseStockDto } from './create-warehouse-stock.dto';
import { Warehouse } from '../warehouse/warehouse.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(WarehouseStock)
export class WarehouseStockRespository extends Repository<WarehouseStock> {
    
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
            throw new BadRequestException(error);
            
        }
    }
}