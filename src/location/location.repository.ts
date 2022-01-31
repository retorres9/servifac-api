import { EntityRepository, Repository } from "typeorm";
import { CreateLocationDto } from "./create-location.dto";
import { Location } from './location.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
    async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
        const {loc_name} = createLocationDto;
        const location = this.create({loc_name});
        try {
            return location.save();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getLocations(): Promise<Location[]> {
        const query = this.createQueryBuilder('location');
        return query.getMany();;
    }
}