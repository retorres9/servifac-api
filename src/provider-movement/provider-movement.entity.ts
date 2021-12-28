import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovementType } from './movement-type.enum';
import { Provider } from '../provider/provider.entity';
import { User } from '../user/user.entity';

@Entity()
export class ProviderMovement extends BaseEntity {
    @PrimaryGeneratedColumn()
    pmv_id: number;

    @Column({type: 'decimal', precision: 7, scale: 2})
    pmv_amount: number;

    @Column({type: 'date'})
    pmv_date: Date;

    @Column({nullable: true})
    pmv_type: string;

    @Column({nullable: false})
    pmv_movement: MovementType;

    @Column({default: 'N/A'})
    pmv_description?: string;

    @ManyToOne(type => Provider, provider => provider.prov_movement)
    @JoinColumn({name: 'prov_ruc'})
    provider: Provider;

    @ManyToOne(type => User, user => user.user_pmv)
    @JoinColumn({name: 'user_ci'})
    pmv_user: User;
}