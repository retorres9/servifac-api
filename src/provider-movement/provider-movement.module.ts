import { Module } from '@nestjs/common';
import { ProviderMovementController } from './provider-movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderMovementRepository } from './provider-movement.repository';
import { ProviderMovementService } from './provider-movement.service';

@Module({
  controllers: [ProviderMovementController],
  providers: [ProviderMovementService],
  imports: [
    TypeOrmModule.forFeature([ProviderMovementRepository])
  ]
})
export class ProviderPaymentModule {}
