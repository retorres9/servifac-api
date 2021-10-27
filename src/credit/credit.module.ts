import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from '../client/client.repository';
import { CreditRepository } from './credit.repository';

@Module({
  controllers: [CreditController],
  providers: [CreditService],
  imports: [
    TypeOrmModule.forFeature([
      CreditRepository,
      ClientRepository
    ])
  ]
})
export class CreditModule {}
