import { EntityRepository, Repository } from "typeorm";
import { SaleDetail } from './sale-detail.entity';

@EntityRepository(SaleDetail)
export class SaleDetailRepository extends Repository<SaleDetail> {
    
}