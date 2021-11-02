import { Module } from '@nestjs/common';
import { ClientMovementController } from './client-movement.controller';
import { ClientMovementService } from './client-movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientMovementRespository } from './client-movement.repository';
import { ClientRepository } from 'src/client/client.repository';
import { SaleRepository } from '../sale/sale.repository';

@Module({
  controllers: [ClientMovementController],
  providers: [ClientMovementService],
  imports: [
    TypeOrmModule.forFeature([
      ClientMovementRespository,
      ClientRepository,
      SaleRepository,
    ]),
  ],
})
export class ClientPaymentModule {}
