import { EntityRepository, Repository } from "typeorm";
import { CreateLocationDto } from "./create-location.dto";
import { Location } from './location.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
    createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
        const {loc_name} = createLocationDto;
        const location = new Location();
        location.loc_name = loc_name;
        try {
            return location.save();
        } catch (error) {
            console.log(error);            
        }
    }

    getLocations(): Promise<Location[]> {
        const query = this.createQueryBuilder('location');
        const locations = query.getMany();
        return locations;
    }
}