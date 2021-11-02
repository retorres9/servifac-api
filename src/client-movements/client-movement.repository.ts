import { Client } from 'src/client/client.entity';
import { Sale } from 'src/sale/sale.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ClientMovementDto } from './client-movement.dto';
import { ClientMovement } from './client-movement.entity';

@EntityRepository(ClientMovement)
export class ClientMovementRespository extends Repository<ClientMovement> {
    async postMovement(cliMovementDto: ClientMovementDto): Promise<any> {
        let {clp_amount, cli_ci, clm_type} = cliMovementDto;
        const amountReceived = clp_amount;
        const clientQuery = Sale.createQueryBuilder('sale');
        clientQuery.leftJoinAndSelect('sale.sale_client', 'client');
        clientQuery.where('sale.sale_totalPayment < sale.sale_totalRetail');
        clientQuery.andWhere('sale.cli_ci = :ci', {ci: cli_ci});
        let sales = await clientQuery.getMany();
        let salesEdited: Sale[] = sales.map(sales => {
            let reduction = sales.sale_totalRetail - sales.sale_totalPayment;
            if(reduction < clp_amount) {
                clp_amount -= reduction;
                sales.sale_totalPayment = sales.sale_totalRetail
            } else {
                let totalPaid = sales.sale_totalPayment === 0 ? Number(Math.round(sales.sale_totalPayment)) : Number(sales.sale_totalPayment);
                sales.sale_totalPayment = totalPaid + Number(clp_amount);
                clp_amount = 0;
            }
            console.log(sales.sale_totalPayment, 'payment');
            console.log(clp_amount);
            return sales;
        });
        Sale.save(salesEdited);
        sales.forEach(sale => {
            delete sale.sale_client;
        })
        
        const clientMovement = new ClientMovement();
        clientMovement.clp_amount = amountReceived;
        clientMovement.clm_type = 'Pago';
        clientMovement.clp_date = new Date();
        try {
            await clientMovement.save();
        } catch (error) {
            console.log(error);
        }
        return sales;
    }
}