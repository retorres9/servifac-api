import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';
import { Sale } from '../sale/sale.entity';
import { ProviderMovement } from '../provider-movement/provider-movement.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({type: 'varchar'})
  user_ci: string;

  @Column({ nullable: false })
  user_firstName: string;

  @Column({ nullable: false })
  user_lastName: string;

  @Column({ unique: true, nullable: false })
  user_username: string;

  @Column({ nullable: false })
  user_password: string;

  @Column({ nullable: false })
  user_role: UserRole;

  @Column({ type: 'boolean', default: true })
  user_isActive: boolean;

  @OneToMany((type) => Sale, (sale) => sale.sale_user)
  user_sale: number;

  @OneToMany(
    (type) => ProviderMovement,
    (providerMovement) => providerMovement.pmv_user,
  )
  user_pmv: number;
}
