import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Sale } from '../sale/sale.entity';
import { ClientMovement } from '../client-movements/client-movement.entity';
import { Credit } from "src/credit/credit.entity";

@Entity()
export class Client extends BaseEntity {
    @PrimaryColumn({type: 'varchar'})
    cli_ci: string;

    @Column()
    cli_firstName: string;

    @Column()
    cli_lastName: string;

    @Column()
    cli_email?: string;

    @Column({length: 10})
    cli_phone: string;

    @Column()
    cli_address: string;

    @OneToMany(type => Credit, credit => credit.client, {eager: true})
    credit: Credit;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.00})
    cli_debt?: number;

    @Column({default: true})
    cli_isActive: boolean;

    @OneToMany(type => Sale, sale => sale.sale_client)
    sale: Sale;

    @OneToMany(type => ClientMovement, clienMovement => clienMovement.client)
    clientMovement: ClientMovement;
}