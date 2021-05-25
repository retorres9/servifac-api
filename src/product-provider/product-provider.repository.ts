import { EntityRepository, Repository } from "typeorm";
import { CreateProductProviderDto } from "./create-product-provider.dto";
import { ProductProvider } from './product-provider.entity';

@EntityRepository(ProductProvider)
export class ProductProviderRepository extends Repository<ProductProvider> {
    async createProductProvider(productProviderDto: CreateProductProviderDto) {
        const {prod_code, prov_ruc} = productProviderDto;

        const productProvider = new ProductProvider();
        productProviderDto.prod_code = prod_code;
        productProviderDto.prov_ruc = prov_ruc;
        console.log(prov_ruc);
        
        // productProvider.ppr_product = productProviderDto.ppr_product;
        // productProvider.ppr_provider = productProviderDto.ppr_provider;
        // console.log(productProviderDto.ppr_product+ " " +productProviderDto.ppr_provider);
        // prov_ruc.forEach(provider => {
        //     const onProdProvInsert = new ProductProvider();
        //     onProdProvInsert.ppr_product = prov_ruc;
        //     onProdProvInsert.ppr_provider = provider;
            // productProvider.save();
        // });
        
        try {
            return productProvider;
        } catch (error) {
            console.log(error);
        }
    }
}