import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './purchases.repository';
import { CreatePurchaseDto } from './models/create-purchase.model';
import { QueryPurchase } from './models/query-purchase.model';

@Injectable()
export class PurchasesService {
    constructor(private purchaseRepository: PurchaseRepository) {
    }

    postPurchase(createPurchase: CreatePurchaseDto) {
        return this.purchaseRepository.postPurchase(createPurchase);
    }

    getPurchases(query: QueryPurchase) {
        return this.purchaseRepository.getPurchases(query);
    }
}
