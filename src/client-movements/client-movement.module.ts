import { Module } from '@nestjs/common';
import { ClientMovementController } from './client-movement.controller';
import { ClientPaymentService } from './client-movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientPaymentRespository } from './client-movement.repository';

@Module({
  controllers: [ClientMovementController],
  providers: [ClientPaymentService],
  imports: [TypeOrmModule.forFeature([ClientPaymentRespository])]
})
export class ClientPaymentModule {}
