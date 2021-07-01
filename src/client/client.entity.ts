import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from '../sale/sale.entity';
import { ClientMovement } from '../client-movements/client-movement.entity';

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    cli_id: number;

    @Column({type: 'varchar', unique: true})
    cli_ci: string;

    @Column()
    cli_firstName: string;

    @Column()
    cli_lastName: string;

    @Column()
    cli_email?: string;

    @Column({length: 10})
    cli_phone: string;

    @Column({type: 'decimal', precision: 7, scale: 3, default: 0.000})
    cli_debt?: number;

    @Column({default: true})
    cli_isActive: boolean;

    @OneToMany(type => Sale, sale => sale.client)
    sale: Sale;

    @OneToMany(type => ClientMovement, clienMovement => clienMovement.client)
    clientMovement: ClientMovement;
}