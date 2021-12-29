import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Configuration extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'smallint'})
    id: number;

    @Column()
    clientName: string;

    @Column()
    clientRUC: string;

    @Column()
    address: string;

    @Column({nullable: false})
    tax: number;
}