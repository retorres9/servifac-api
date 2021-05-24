import { Module } from '@nestjs/common';
import { ProductProviderController } from './product-provider.controller';
import { ProductProviderService } from './product-provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProviderRepository } from './product-provider.repository';

@Module({
  controllers: [ProductProviderController],
  providers: [ProductProviderService],
  imports: [
    TypeOrmModule.forFeature([ProductProviderRepository])
  ]
})
export class ProductProviderModule {}
