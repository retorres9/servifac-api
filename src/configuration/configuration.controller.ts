import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationModel } from './configuration.model';

@Controller('configuration')
export class ConfigurationController {
    constructor(private configurationService: ConfigurationService) {}

    @Get()
    getConfiguration() {
        return this.configurationService.getConfiguration();
    }

    @Patch()
    patchConfiguration(@Body() config: ConfigurationModel) {
        return this.configurationService.patchConfiguration(config);
    }
}
