import { Injectable } from '@nestjs/common';
import { CreditRepository } from './credit.repository';
import { CreditAuth } from '../client/models/credit-auth.dto';

@Injectable()
export class CreditService {
    constructor(private creditRepository: CreditRepository) {
        
    }
    checkAvailability() {
        return this.creditRepository.checkAvailability();
    }

    postCreditAuthorization(creditAuth: CreditAuth): Promise<boolean> {
        return this.creditRepository.postCreditAuthorization(creditAuth);
    }
}
