import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  cat_id: number;

  @Column({nullable: false})
  cat_name: string;

  @OneToMany(type => Product, product => product.category)
  products: Product;
}
