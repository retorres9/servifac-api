import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationRepository } from './configuration.repository';
import { Configuration } from './configuration.entity';
import { ConfigurationModel } from './configuration.model';

@Injectable()
export class ConfigurationService {
  constructor(private configurationRepo: ConfigurationRepository) {}

  getConfiguration(): Promise<Configuration> {
    return this.configurationRepo.getConfiguration();
  }

  patchConfiguration(config: ConfigurationModel) {
    return this.configurationRepo.patchConfiguration(config);
  }
}
