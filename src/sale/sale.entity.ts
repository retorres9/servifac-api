import { SaleDetail } from "src/sale-detail/sale-detail.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

}