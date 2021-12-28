import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRepository } from './purchases.repository';
import { ProviderRepository } from '../provider/provider.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [TypeOrmModule.forFeature([PurchaseRepository, ProviderRepository]), UserModule],
})
export class PurchasesModule {}
