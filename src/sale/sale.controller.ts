import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './create-sale.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sale')
@UseGuards(AuthGuard())
export class SaleController {
    constructor(private saleService: SaleService) {}

    @Post()
    onNewSale(@Body()createSaleDto: CreateSaleDto) {
        return this.saleService.createSale(createSaleDto);
    }

    @Get('alert')
    getAlert() {
        return this.saleService.getAlert();
    }
    
    @Get('/listing')
    getSales(@Query('date')date) {
        return this.saleService.getSales(date);
    }

    @Get('/:saleId')
    getSaleById(@Param('saleId')saleId: string) {
        return this.saleService.getSaleById(saleId);
    }

}
