import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from '../client/client.repository';
import { CreditRepository } from './credit.repository';
import { SaleRepository } from '../sale/sale.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CreditController],
  providers: [CreditService],
  imports: [
    TypeOrmModule.forFeature([
      CreditRepository,
      ClientRepository,
      SaleRepository
    ]),
    UserModule
  ]
})
export class CreditModule {}
