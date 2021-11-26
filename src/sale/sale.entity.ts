import { SaleDetail } from "src/sale-detail/sale-detail.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';
import { SaleState } from "./enums/sale-state.enum";
import { SaleType } from './enums/sale-type.enum';

@Entity()
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    sale_id: number;

    @Column({type: 'decimal', precision: 7, scale: 2})
    sale_totalRetail: number;

    @Column({type: 'decimal', precision: 7, scale: 2})
    sale_totalPayment: number;

    @Column({type: 'date'})
    sale_date: Date;

    // ? Added new Info related to SALE
    @Column()
    sale_paymentType: SaleType;

    @Column()
    sale_saleState: SaleState;

    @Column({default: 1})
    sale_store: number;

    @Column({nullable: true, type: 'date'})
    sale_maxDate: Date

    @OneToMany(type => SaleDetail, sale => sale.sale, {eager: true})
    sale: SaleDetail;

    @ManyToOne(type => Client, client => client.sale)
    @JoinColumn({name: 'cli_ci'})
    sale_client: string;

    @ManyToOne(type => User, user => user.user_sale)
    @JoinColumn({name: 'user_ci'})
    sale_user: string;
}