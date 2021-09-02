import { EntityRepository, Repository } from 'typeorm';
import { ClientPaymentDto } from './client-movement.dto';
import { ClientMovement } from './client-movement.entity';

@EntityRepository(ClientMovement)
export class ClientPaymentRespository extends Repository<ClientMovement> {
    async createClientPayment(clientPaymentDto: ClientPaymentDto): Promise<ClientMovement> {
        const {clp_amount} = clientPaymentDto;
        const clientMovement = new ClientMovement();
        clientMovement.clp_amount = clp_amount;
        try {
            await clientMovement.save();
        } catch (error) {
            console.log(error);
        }
        return clientMovement;
    }
}