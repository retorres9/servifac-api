import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './models/create-purchase.model';
import { QueryPurchase } from './models/query-purchase.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('purchases')
@UseGuards(AuthGuard())
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

    @Get('/alarm')
    getPurchasesAlarm(@Query() query: string) {
        return this.purchaseService.getPurchasesAlarm(query);
    }
}
