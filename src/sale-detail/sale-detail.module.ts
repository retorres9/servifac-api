import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailController } from './sale-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetailRepository } from './sale-detail.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SaleDetailService],
  controllers: [SaleDetailController],
  imports: [
    TypeOrmModule.forFeature([SaleDetailRepository]),
    UserModule
  ]
})
export class SaleDetailModule {}
