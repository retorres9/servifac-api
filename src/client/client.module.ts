import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { CreditRepository } from '../credit/credit.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    TypeOrmModule.forFeature([ClientRepository, CreditRepository]),
    UserModule,
  ],
})
export class ClientModule {}
