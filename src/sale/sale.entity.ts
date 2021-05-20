import { type } from "os";
import { SaleDetail } from "src/sale-detail/sale-detail.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from '../client/client.entity';

@Entity()
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn()
    sale_id: number;

    @Column({type: 'decimal'})
    sale_totalAmount: number;

    @Column({type: 'decimal'})
    sale_totalPayment: number;

    @Column({type: 'datetime'})
    sale_date: Date;

    @OneToMany(type => SaleDetail, sale => sale.sale, {eager: true})
    sale: string;

    @ManyToOne(type => Client, client => client.sale)
    @JoinColumn({name: 'cli_ci'})
    client: Client;

}