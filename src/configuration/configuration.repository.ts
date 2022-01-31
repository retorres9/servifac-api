import { EntityRepository, Repository } from "typeorm";
import { Configuration } from './configuration.entity';
import { ConfigurationModel } from './configuration.model';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Configuration)
export class ConfigurationRepository extends Repository<Configuration> {
    async getConfiguration(): Promise<Configuration> {
        const query = this.createQueryBuilder('configiration');
        query.where('id = 1')
        const configuration = await query.getOne();
        return configuration;
    }
    
    async patchConfiguration(config: ConfigurationModel) {
        const {id, clientName, clientRUC, address, tax} = config;

        const configUpdated = await this.findOne(id);
        
        // const configuration = this.create({
            configUpdated.clientName = clientName;
            configUpdated.clientRUC = clientRUC;
            configUpdated.address = address;
            configUpdated.tax = tax;
        // });
        try {
            return this.save(configUpdated);
        } catch (error) {
            throw new BadRequestException();
        }

    }
}