import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationRepository } from './configuration.repository';
import { Configuration } from './configuration.entity';

@Injectable()
export class ConfigurationService {
  constructor(private configurationRepo: ConfigurationRepository) {}

  getConfiguration(): Promise<Configuration> {
    return this.configurationRepo.getConfiguration();
  }
}
