import { Body, Controller, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './create-sale.dto';

@Controller('sale')
export class SaleController {
    constructor(private saleService: SaleService) {}

    @Post()
    onNewSale(@Body()createSaleDto: CreateSaleDto) {
        return this.saleService.createSale(createSaleDto);
    }
}
