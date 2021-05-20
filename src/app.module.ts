import { Module } from '@nestjs/common';
import { WarehouseModule } from './warehouse/warehouse.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';
import { SaleModule } from './sale/sale.module';
import { ProviderPaymentModule } from './provider-movement/provider-movement.module';
import { ClientPaymentModule } from './client-movements/client-movement.module';
import { SaleDetailModule } from './sale-detail/sale-detail.module';
import { WarehouseStockModule } from './warehouse-stock/warehouse-stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORMCONFIG } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORMCONFIG),
    WarehouseModule,
    CategoryModule,
    LocationModule,
    ProductModule,
    ProviderModule,
    SaleModule,
    ProviderPaymentModule,
    ClientPaymentModule,
    SaleDetailModule,
    WarehouseStockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
