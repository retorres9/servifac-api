import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';

@Entity()
export class Credit extends BaseEntity {
    @PrimaryGeneratedColumn()
    cre_id: number;

    @Column()
    cre_amount: number;

    @Column({default: 0})
    cre_used: number;

    @ManyToOne(type => Client, client => client.credit)
    client: Client;

    @ManyToOne(type => User, user => user.credit)
    user: User;
}