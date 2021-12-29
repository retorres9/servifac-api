import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WarehouseStock } from '../warehouse-stock/warehouse-stock.entity';

@Entity()
export class Warehouse extends BaseEntity {
    @PrimaryGeneratedColumn({type: "smallint"})
    war_id: number

    @Column({nullable: false})
    war_name: string;

    @OneToMany(type => WarehouseStock, warehouseStocks => warehouseStocks.warehouses)
    warehouseStock: WarehouseStock[];
}