import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../product/product.entity';

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'smallint'})
    loc_id: number;

    @Column({nullable: false})
    loc_name: string;

    @OneToMany(type => Product, product => product.location)
    @JoinColumn({name: 'prod_code'})
    product: string;
}