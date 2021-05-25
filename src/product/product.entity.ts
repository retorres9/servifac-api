import { WarehouseStock } from "src/warehouse-stock/warehouse-stock.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Location } from '../location/location.entity';
import { SaleDetail } from '../sale-detail/sale-detail.entity';
import { ProductProvider } from '../product-provider/product-provider.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryColumn({unique: true})
    prod_code: string;

    @Column({unique: true, nullable: false})
    prod_name: string;

    @Column({type: 'decimal', precision: 7, scale: 3})
    prod_price: number;

    @Column({type: 'decimal', precision: 7, scale: 3, default: 23.2})
    prod_buyPrice: number;

    @Column({type: 'decimal', precision: 7, scale: 3, default: 23.2})
    prod_majorPrice: number;

    @Column({default: true})
    prod_inStock: boolean;

    @Column({type: 'smallint', default: 23})
    prod_quantity: number;

    @Column({type: 'smallint', default: 2})
    prod_minQuantity: number;

    @OneToMany(type => WarehouseStock, warehouseStock => warehouseStock.products)
    warehouseStock?: WarehouseStock[];

    @ManyToOne(type => Category, categories => categories.products, {eager: true})
    @JoinColumn({name: 'cat_id'})
    category: number;

    @ManyToOne(type => Location, location => location.product, {eager: true})
    @JoinColumn({name: 'loc_id'})
    location: number;

    @OneToMany(type => SaleDetail, saleDetail => saleDetail.product)
    saleDetail: SaleDetail;

    @OneToMany(type => ProductProvider, productProvider => productProvider.ppr_product)
    ppr_provider: Product;
}