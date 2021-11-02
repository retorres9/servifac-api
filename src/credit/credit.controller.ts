import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditAuth } from '../client/models/credit-auth.dto';

@Controller('credit')
export class CreditController {
    constructor(private creditService: CreditService) {        
    }

    @Get()
    checkAvailability() {
        return this.creditService.checkAvailability();
    }

    @Post()
    postCreditAuthorization(@Body()creditAuthorization: CreditAuth): Promise<boolean> {
        console.log('here');
        
        return this.creditService.postCreditAuthorization(creditAuthorization);
    }
}
