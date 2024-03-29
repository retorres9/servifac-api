import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType } from './prov_account-type.enum';
import { ProviderMovement } from '../provider-movement/provider-movement.entity';
import { ProductProvider } from '../product-provider/product-provider.entity';
import { Purchases } from 'src/purchases/purchases.entity';

@Entity()
export class Provider extends BaseEntity {
    @PrimaryColumn({length: 13, unique: true})
    prov_ruc: string

    @Column()
    prov_name: string;

    @Column()
    prov_accountName: string;

    @Column()
    prov_accountType: AccountType;

    @Column()
    prov_accountNumber: string;

    @Column({type: 'decimal', precision: 7, scale: 2})
    prov_debt

    @Column({length: 10})
    prov_phone: string;

    @Column({default: true})
    prov_isActive: boolean;

    @OneToMany(type => ProviderMovement, providerMovement => providerMovement.provider)
    prov_movement: ProviderMovement;

    @OneToMany(type => ProductProvider, productProvider => productProvider.ppr_provider)
    ppr_provider: ProductProvider;

    @OneToMany(type => Purchases, purchases => purchases.provider)
    prov_pur: Purchases;
}