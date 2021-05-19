import { BaseEntity, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from '../sale/sale.entity';

@Entity()
export class SaleDetail extends BaseEntity {
    @PrimaryGeneratedColumn({unsigned: true})
    sdt_id: number;

    @Column({type: 'tinyint'})
    sdt_quantity: number;

    @Column()
    sdt_salePrice: number;

    @ManyToOne(type => Sale, sale => sale.sale_id)
    @JoinColumn({name: 'sale_id'})
    sale: number;
}