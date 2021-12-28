import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseRepository } from './warehouse.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [
    TypeOrmModule.forFeature([WarehouseRepository]),
    UserModule
  ],
  // exports: [WarehouseService, TypeOrmModule.forFeature([WarehouseRepository])]
})
export class WarehouseModule {}
