import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailController } from './sale-detail.controller';

@Module({
  providers: [SaleDetailService],
  controllers: [SaleDetailController]
})
export class SaleDetailModule {}
