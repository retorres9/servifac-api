import { Module } from '@nestjs/common';
import { ClientPaymentController } from './client-payment.controller';
import { ClientPaymentService } from './client-payment.service';

@Module({
  controllers: [ClientPaymentController],
  providers: [ClientPaymentService]
})
export class ClientPaymentModule {}
