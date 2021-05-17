import { Body, Controller, Post } from '@nestjs/common';
import { WarehouseStockService } from './warehouse-stock.service';
import { CreateWarehouseStockDto } from './create-warehouse-stock.dto';
import { WarehouseStock } from './warehouse-stock.entity';

@Controller('warehouse-stock')
export class WarehouseStockController {
    constructor(private warehouseStockService: WarehouseStockService) {}

    @Post()
    CreateWarehouseStock(@Body() createWarehouseStockDto: CreateWarehouseStockDto): Promise<WarehouseStock> {
        return this.warehouseStockService.createWarehouseStock(createWarehouseStockDto);
    }

}
