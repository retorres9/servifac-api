import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseRepository } from './warehouse.repository';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [
    TypeOrmModule.forFeature([WarehouseRepository])
  ],
  // exports: [WarehouseService, TypeOrmModule.forFeature([WarehouseRepository])]
})
export class WarehouseModule {}
