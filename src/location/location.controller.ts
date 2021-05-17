import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './create-location.dto';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get()
    getLocations() {
        return this.locationService.getLocations();
    }

    @Post()
    createLocation(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.createLocation(createLocationDto);
    }
}
