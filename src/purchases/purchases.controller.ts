import { Body, Controller, Post } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './models/create-purchase.model';

@Controller('purchases')
export class PurchasesController {
    constructor(private purchaseService: PurchasesService) {
        
    }
    @Post()
    postPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {        
        return this.purchaseService.postPurchase(createPurchaseDto);
    }
}
