import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';
import { LocationRepository } from './location.repository';
import { CreateLocationDto } from './create-location.dto';

@Injectable()
export class LocationService {
    constructor(private locationRespository: LocationRepository) {}

    createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
        return this.locationRespository.createLocation(createLocationDto);
    }

    getLocations() {
        return this.locationRespository.getLocations();
    }
}
