import { Injectable } from '@nestjs/common';
import { CreateWarehouseStockDto } from './create-warehouse-stock.dto';
import { WarehouseStockRespository } from './warehouse-stock.repository';

@Injectable()
export class WarehouseStockService {
    constructor(private warehouseStockRepository: WarehouseStockRespository) {}

    async createWarehouseStock(createWarehouseStockDto: CreateWarehouseStockDto) {
        return this.warehouseStockRepository.createWarehouseStock(createWarehouseStockDto);
    }
}
