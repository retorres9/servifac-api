import { WarehouseStock } from "src/warehouse-stock/warehouse-stock.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryColumn({unique: true})
    prod_code: string;

    @Column({unique: true, nullable: false})
    prod_name: string;

    @Column({type: 'decimal'})
    prod_price: number;

    @Column({default: true})
    prod_inStock: boolean;

    @Column()
    prod_quantity: number;

    @OneToMany(type => WarehouseStock, warehouseStock => warehouseStock.products, {cascade: true})
    warehouseStock?: WarehouseStock[];

    @ManyToOne(type => Category, categories => categories.products, {eager: true})
    @JoinColumn({name: 'cat_id'})
    category: number;
}