import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationRepository } from './configuration.repository';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  imports: [
    TypeOrmModule.forFeature([ConfigurationRepository])
  ]
})
export class ConfigurationModule {}
