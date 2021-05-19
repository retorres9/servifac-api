import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleRespository } from './sale.repository';

@Module({
  providers: [SaleService],
  controllers: [SaleController],
  imports: [
    TypeOrmModule.forFeature([SaleRespository])
  ]
})
export class SaleModule {}
