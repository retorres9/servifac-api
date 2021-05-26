import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserRole } from './user-role.enum';
import { Sale } from '../sale/sale.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    user_ci: string;

    @Column({nullable: false})
    user_firstName: string;

    @Column({nullable: false})
    user_lastName: string;

    @Column({unique: true, nullable: false})
    user_username: string;

    @Column({nullable: false})
    user_role : UserRole;

    @Column({type: 'boolean'})
    user_isActive: boolean;

    @OneToMany(type => Sale, sale => sale.sale_user)
    user_sale: number;
}