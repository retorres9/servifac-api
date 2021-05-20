import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientMovement extends BaseEntity {
    @PrimaryGeneratedColumn()
    clp_id: number;

    @Column()
    clp_amount: number;

    @Column({type: 'datetime'})
    clp_date: Date;

}