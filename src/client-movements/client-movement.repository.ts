import { Sale } from 'src/sale/sale.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ClientMovementDto } from './client-movement.dto';
import { ClientMovement } from './client-movement.entity';
import { Decimal } from 'decimal.js';
import { BadRequestException } from '@nestjs/common';
import { Client } from '../client/client.entity';

@EntityRepository(ClientMovement)
export class ClientMovementRespository extends Repository<ClientMovement> {
    async postMovement(cliMovementDto: ClientMovementDto): Promise<any> {
        // ! No errors are being sent back
        let {clm_amount, cli_ci, clm_type} = cliMovementDto;        
        const amountReceived = clm_amount;
        const clientQuery = Sale.createQueryBuilder('sale');
        clientQuery.leftJoinAndSelect('sale.sale_client', 'client');
        clientQuery.where('sale.sale_totalPayment < sale.sale_totalRetail');
        clientQuery.andWhere('sale.cli_ci = :ci', {ci: cli_ci});
        let sales = await clientQuery.getMany();
        let salesEdited: Sale[] = sales.map(sales => {
            let reduction = new Decimal(sales.sale_totalRetail).minus(new Decimal(sales.sale_totalPayment));
            
            if(+new Decimal(reduction) < +new Decimal(clm_amount)) {
                clm_amount = +new Decimal(clm_amount).minus(reduction);
                sales.sale_totalPayment = sales.sale_totalRetail
            } else {
                let totalPaid = sales.sale_totalPayment === 0 ? Number(Math.round(sales.sale_totalPayment)) : Number(sales.sale_totalPayment);
                sales.sale_totalPayment = +new Decimal(totalPaid).plus(new Decimal(clm_amount));
                clm_amount = 0;
            }
            return sales;
        });
        
        Sale.save(salesEdited);
        sales.forEach(sale => {
            delete sale.sale_client;
        })
        const client = await Client.findOne(cli_ci);
        if (!client) {
            throw new BadRequestException();
        }
        const clientMovement = new ClientMovement();
        clientMovement.client = client;
        clientMovement.clp_amount = amountReceived;
        clientMovement.clm_type = clm_type;
        clientMovement.clp_date = new Date();
        try {
            await clientMovement.save();
        } catch (error) {
            throw new BadRequestException();
        }
        return sales;
    }

    async getClientHistory(client_ci: string) {
        const query = this.createQueryBuilder('cm');
        query.leftJoinAndSelect('cm.client','client');
        query.where('cm.cli_ci = :client_ci', {client_ci});
        query.select(['cm', 'client.cli_firstName']);
        query.orderBy('cm.clp_date', 'DESC');
        return query.getMany();
    }
}