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
    
    @Get('/listing')
    getSales(@Query('date')date) {
        console.log(date, 'date');
        
        return this.saleService.getSales(date);
    }

    @Get('/:saleId')
    getSaleById(@Param('saleId')saleId: string) {      
        console.log(saleId);
        return this.saleService.getSaleById(saleId);
    }

}
