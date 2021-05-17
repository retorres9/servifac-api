import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'smallint'})
    loc_id: number;

    @Column({nullable: false})
    loc_name: string;
}