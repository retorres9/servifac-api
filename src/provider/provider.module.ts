import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRepository } from './provider.repository';
import { PurchaseRepository } from 'src/purchases/purchases.repository';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [
    TypeOrmModule.forFeature([ProviderRepository, PurchaseRepository])
  ]
})
export class ProviderModule {}
