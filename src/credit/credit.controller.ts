import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditAuth } from '../client/models/credit-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('credit')
@UseGuards(AuthGuard())
export class CreditController {
    constructor(private creditService: CreditService) {        
    }

    @Get()
    checkAvailability() {
        return this.creditService.checkAvailability();
    }

    @Post()
    postCreditAuthorization(@Body()creditAuthorization: CreditAuth): Promise<boolean> {
        return this.creditService.postCreditAuthorization(creditAuthorization);
    }
}
