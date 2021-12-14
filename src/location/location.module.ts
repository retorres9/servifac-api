import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TypeOrmModule.forFeature([LocationRepository]),
    UserModule
  ]
})
export class LocationModule {}
