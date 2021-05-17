import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseStockController } from './warehouse-stock.controller';
import { WarehouseStockService } from './warehouse-stock.service';
import { WarehouseStockRespository } from './warehouse-stock.repository';

@Module({
  controllers: [WarehouseStockController],
  providers: [WarehouseStockService],
  imports: [
    TypeOrmModule.forFeature([WarehouseStockRespository])
  ]
})
export class WarehouseStockModule {}
