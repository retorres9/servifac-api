import { Module } from '@nestjs/common';
import { ProviderPaymentController } from './provider-payment.controller';
import { ProviderPaymentService } from './provider-payment.service';

@Module({
  controllers: [ProviderPaymentController],
  providers: [ProviderPaymentService]
})
export class ProviderPaymentModule {}
