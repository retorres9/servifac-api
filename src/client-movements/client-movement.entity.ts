import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from '../client/client.entity';

@Entity()
export class ClientMovement extends BaseEntity {
    @PrimaryGeneratedColumn()
    clp_id: number;

    @Column({type: 'decimal', precision: 7, scale: 2})
    clp_amount: number;

    @Column()
    clm_type: string;

    @Column({type: 'date'})
    clp_date: Date;

    @ManyToOne(type => Client, client => client.clientMovement)
    @JoinColumn({name: 'cli_ci'})
    client: Client;
}