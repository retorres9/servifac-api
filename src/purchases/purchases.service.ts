import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchases.repository';
import { CreatePurchaseDto } from './models/create-purchase.model';

@Injectable()
export class PurchasesService {
    constructor(private purchaseRepository: PurchaseRepository) {
    }

    postPurchase(createPurchase: CreatePurchaseDto) {
        return this.purchaseRepository.postPurchase(createPurchase);
    }
}
