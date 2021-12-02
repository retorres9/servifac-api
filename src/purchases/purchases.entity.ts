import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from '../provider/provider.entity';
import { User } from '../user/user.entity';

@Entity()
export class Purchases extends BaseEntity {
    @PrimaryGeneratedColumn({unsigned: true})
    pur_id: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    pur_amount: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.00})
    pur_paid: number;

    @Column({type: 'date'})
    pur_date: Date;

    @Column({type: 'date'})
    pur_maxDate: Date;

    @Column()
    pur_info: string;

    @ManyToOne(type => Provider, provider => provider.prov_pur)
    @JoinColumn({name: 'pur_ruc'})
    provider: Provider;

    @ManyToOne(type => User, user => user.purchase)
    @JoinColumn({name: 'pur_user_ci'})
    user: User;

}