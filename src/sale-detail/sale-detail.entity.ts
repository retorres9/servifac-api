import { BaseEntity, Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from '../sale/sale.entity';
import { Product } from '../product/product.entity';

@Entity()
export class SaleDetail extends BaseEntity {
    @PrimaryGeneratedColumn({unsigned: true})
    sdt_id: number;

    @Column({type: 'smallint'})
    sdt_quantity: number;

    @Column({type: 'decimal', precision: 7, scale: 3})
    sdt_salePrice: number;

    @ManyToOne(type => Sale, sale => sale.sale_id)
    @JoinColumn({name: 'sale_id'})
    sale: Sale;

    @ManyToOne(type => Product, product => product.saleDetail)
    @JoinColumn({name: 'prod_code'})
    product: string;
}