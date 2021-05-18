import { type } from 'os';
import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
import { AccountType } from './prov_account-type.enum';

@Entity()
export class Provider extends BaseEntity {
    @PrimaryColumn({length: 13})
    prov_ruc: string

    @Column()
    prov_name: string;

    @Column()
    prov_accountName: string;

    @Column()
    prov_accountType: AccountType;

    @Column()
    prov_accountNumber: string;

    @Column({type: 'decimal'})
    prov_debt

    @Column({length: 10})
    prov_phone: string;

    @Column({default: true})
    prov_isActive: boolean;
}