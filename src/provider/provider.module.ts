import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PorviderRepository } from './provider.repository';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [
    TypeOrmModule.forFeature([PorviderRepository])
  ]
})
export class ProviderModule {}
