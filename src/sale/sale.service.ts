import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSaleDto } from './create-sale.dto';
import { SaleRepository } from './sale.repository';
import { UserRespository } from '../user/user.repository';

@Injectable()
export class SaleService {
    constructor(private saleRepository: SaleRepository,
                @InjectRepository(UserRespository)
                private readonly user: UserRespository) {
        
    }
    async createSale(createSaleDto: CreateSaleDto) {
        // ! Change to get sale user
        const user = await this.user.findOne(createSaleDto.sale_client);
        return this.saleRepository.createSale(createSaleDto, user);
    }
}
