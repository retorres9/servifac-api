import { EntityRepository, Repository } from "typeorm";
import { CreateWarehouseDto } from "./create-warehouse.dto";
import { Warehouse } from './warehouse.entity';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {
    createWarehouse(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
        const {war_name} = createWarehouseDto;
        const warehouse = new Warehouse();
        warehouse.war_name = war_name;
        try {
            return warehouse.save();
        } catch (error) {
            console.log(error);
        }
    }

    async getWarehouses(): Promise<Warehouse[]> {
        const query = this.createQueryBuilder('warehouse');
        const warehouses = await query.getMany()
        return warehouses;
    }

    async getWarehouseById(id: number): Promise<Warehouse> {
        const query = this.createQueryBuilder('warehouse');
        query.andWhere(`warehouse.war_id = ${id}`)
        console.log(query.getSql());
        
        const warehouse = await query.getOne()
        return warehouse;
    }
}