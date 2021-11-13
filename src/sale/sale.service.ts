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
        const user = await this.user.findOne({user_username: createSaleDto.sale_user});
        return this.saleRepository.createSale(createSaleDto, user);
    }

    async getSales(date: string) {
        return this.saleRepository.getSales(date);
    }
    
    async getSaleById(saleId: string) {
        return this.saleRepository.getSaleById(saleId);
    }

    async getAlert() {
        return this.saleRepository.getAlert();
    }
}
