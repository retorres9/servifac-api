import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WarehouseService } from '../warehouse/warehouse.service';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { Warehouse } from './warehouse.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('warehouse')
@UseGuards(AuthGuard())
export class WarehouseController {
    constructor(private warehouseService: WarehouseService) {}

    @Post()
    createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
        return this.warehouseService.createWarehouse(createWarehouseDto);
    }

    @Get()
    getWarehouses(): Promise<Warehouse[]> {
        return this.warehouseService.getWareHouses();
    }

    @Get(':id')
    getWarehouseById(@Param('id') id: number) {
        return this.warehouseService.getWarehouseById(id);
    }
}
