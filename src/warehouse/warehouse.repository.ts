import { EntityRepository, Repository } from "typeorm";
import { CreateWarehouseDto } from "./create-warehouse.dto";
import { Warehouse } from './warehouse.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {
    async createWarehouse(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
        const {war_name} = createWarehouseDto;
        const warehouse = this.create({
            war_name
        });        
        try {
            await warehouse.save();
        } catch (error) {
            throw new BadRequestException(error);
        }
        return warehouse;
    }

    async getWarehouses(): Promise<Warehouse[]> {
        const query = this.createQueryBuilder('warehouse');
        return query.getMany();;
    }

    async getWarehouseById(id: number): Promise<Warehouse> {
        const query = this.createQueryBuilder('warehouse');
        query.andWhere(`warehouse.war_id = ${id}`);
        return query.getOne();
    }
}