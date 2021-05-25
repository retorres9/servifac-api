import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../product/product.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProductProvider extends BaseEntity {
    @PrimaryGeneratedColumn()
    ppr_id: number;

    @ManyToOne(type => Product, product => product.ppr_provider, {cascade: true})
    @JoinColumn({name: 'prod_code'})
    ppr_product: string;

    @ManyToOne(type => Provider, provider => provider.ppr_provider)
    @JoinColumn({name: 'prov_ruc'})
    ppr_provider: string;
}