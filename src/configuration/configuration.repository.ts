import { EntityRepository, Repository } from "typeorm";
import { Configuration } from './configuration.entity';

@EntityRepository(Configuration)
export class ConfigurationRepository extends Repository<Configuration> {
    async getConfiguration(): Promise<Configuration> {
        const query = this.createQueryBuilder('configiration');
        query.where('id = 1')
        const configuration = await query.getOne();
        return configuration;
    }
}