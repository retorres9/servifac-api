import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovementType } from './movement-type.enum';
import { Provider } from '../provider/provider.entity';

@Entity()
export class ProviderMovement extends BaseEntity {
    @PrimaryGeneratedColumn()
    pmv_id: number;

    @Column({type: 'decimal', precision: 7, scale: 3})
    pmv_amount: number;

    @Column({type: 'datetime'})
    pmv_date: Date;

    @Column({nullable: false})
    pmv_movement: MovementType;

    @Column()
    pmv_description?: string;

    @ManyToOne(type => Provider, provider => provider.prov_movement)
    @JoinColumn({name: 'prov_ruc'})
    provider: string[];
}