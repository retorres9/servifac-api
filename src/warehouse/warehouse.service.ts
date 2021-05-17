import { Injectable } from '@nestjs/common';
import { Warehouse } from './warehouse.entity';
import { WarehouseRepository } from './warehouse.repository';
import { CreateWarehouseDto } from './create-warehouse.dto';

@Injectable()
export class WarehouseService {
    constructor(private warehouseRepository: WarehouseRepository) {}

    createWarehouse(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
        return this.warehouseRepository.createWarehouse(createWarehouseDto);
    }

    getWareHouses(): Promise<Warehouse[]> {
        return this.warehouseRepository.getWarehouses();
    }
    getWarehouseById(id: number): Promise<Warehouse> {
        return this.warehouseRepository.getWarehouseById(id);
    }
}
