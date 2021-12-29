import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from '../warehouse/warehouse.entity';
import { Product } from '../product/product.entity';

@Entity()
export class WarehouseStock extends BaseEntity {
    @PrimaryGeneratedColumn({type: "smallint"})
    wrs_id: number;

    @Column()
    wrs_quantity: number;

    @ManyToOne(type => Warehouse, warehouse => warehouse.warehouseStock, {eager: true})
    @JoinColumn({name: "war_id"})
    warehouses: Warehouse;

    @ManyToOne(type => Product, product => product.warehouseStock)
    @JoinColumn({name: 'prod_code'})
    products: Product;
}