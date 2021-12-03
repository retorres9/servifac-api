import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './models/create-purchase.model';
import { QueryPurchase } from './models/query-purchase.model';

@Controller('purchases')
export class PurchasesController {
    constructor(private purchaseService: PurchasesService) {
        
    }
    @Post()
    postPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
        return this.purchaseService.postPurchase(createPurchaseDto);
    }

    @Get()
    getPurchases(@Query() query: QueryPurchase) {
        return this.purchaseService.getPurchases(query);
    }
}
