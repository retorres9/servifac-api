import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './create-location.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('location')
@UseGuards(AuthGuard())
export class LocationController {
    constructor(private locationService: LocationService) {}

    @Get()
    getLocations() {
        return this.locationService.getLocations();
    }

    @Post()
    createLocation(@Body() createLocationDto: CreateLocationDto) {
        console.log(createLocationDto);
        
        return this.locationService.createLocation(createLocationDto);
    }
}
