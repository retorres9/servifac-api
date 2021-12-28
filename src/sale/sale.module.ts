import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleRepository } from './sale.repository';
import { UserRespository } from 'src/user/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SaleService],
  controllers: [SaleController],
  imports: [
    TypeOrmModule.forFeature([SaleRepository, UserRespository]),
    UserModule
  ]
})
export class SaleModule {}
