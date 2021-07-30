import { Controller, Get } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
    constructor(private configurationService: ConfigurationService) {}

    @Get()
    getConfiguration() {
        return this.configurationService.getConfiguration();
    }
}
