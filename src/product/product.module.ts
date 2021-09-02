import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductProviderRepository } from '../product-provider/product-provider.repository';
import { UserModule } from '../user/user.module';
import { ConfigurationRepository } from '../configuration/configuration.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      ProductRepository,
      ProductProviderRepository,
      ConfigurationRepository,
    ]),
  ],
})
export class ProductModule {}
