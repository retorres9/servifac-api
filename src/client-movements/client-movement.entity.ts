import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from '../client/client.entity';

@Entity()
export class ClientMovement extends BaseEntity {
    @PrimaryGeneratedColumn()
    clp_id: number;

    @Column()
    clp_amount: number;

    @Column({type: 'datetime'})
    clp_date: Date;

    @ManyToOne(type => Client, client => client.clientMovement)
    @JoinColumn({name: 'cli_ci'})
    client: string;


}