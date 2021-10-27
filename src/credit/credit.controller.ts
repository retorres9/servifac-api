import { Controller, Get } from '@nestjs/common';
import { CreditService } from './credit.service';

@Controller('credit')
export class CreditController {
    constructor(private creditService: CreditService) {
        
    }

    @Get()
    checkAvailability() {
        return this.creditService.checkAvailability();
    }
}
