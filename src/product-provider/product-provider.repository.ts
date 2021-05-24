import { EntityRepository, Repository } from "typeorm";
import { ProductProvider } from './product-provider.entity';

@EntityRepository(ProductProvider)
export class ProductProviderRepository extends Repository<ProductProvider> {
    
}