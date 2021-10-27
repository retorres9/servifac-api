import { Injectable } from '@nestjs/common';
import { CreditRepository } from './credit.repository';

@Injectable()
export class CreditService {
    constructor(private creditRepository: CreditRepository) {
        
    }
    checkAvailability() {
        return this.creditRepository.checkAvailability();
    }
}
