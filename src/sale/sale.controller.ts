import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './create-sale.dto';

@Controller('sale')
export class SaleController {
    constructor(private saleService: SaleService) {}

    @Post()
    onNewSale(@Body()createSaleDto: CreateSaleDto) {
        return this.saleService.createSale(createSaleDto);
    }
    
    @Get('/:saleId')
    getSaleById(@Param('saleId')saleId: string) {        
        return this.saleService.getSales(saleId);
    }

    @Get('/listing')
    getSales(@Query('date')date: string) {
        console.log(date);
        
        return this.saleService.getSales(date);
    }
}
