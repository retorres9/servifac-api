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
// import { TYPEORMCONFIG } from './config/typeorm.config';
import { ClientModule } from './client/client.module';
import { ProductProviderModule } from './product-provider/product-provider.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { CreditModule } from './credit/credit.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const inProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: inProduction,
          extra: {
            ssl: inProduction ? {rejectUnauthorized: false} : null
          },
          type: 'postgres',
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        }
      }
    }),
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
    ClientModule,
    ProductProviderModule,
    UserModule,
    ConfigurationModule,
    CreditModule,
    PurchasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
