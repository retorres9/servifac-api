import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TypeOrmModule.forFeature([LocationRepository])
  ]
})
export class LocationModule {}
