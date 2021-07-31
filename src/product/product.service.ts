import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { ProductBarcode } from './productBarcode.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationRepository } from '../configuration/configuration.repository';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository,
        @InjectRepository(ConfigurationRepository)
  private readonly config: ConfigurationRepository) {}

    createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
    }

    getProducts(): Promise<Product[]> {
        return this.productRepository.getProducts();
    }

    async getProductBarcode(code: string): Promise<ProductBarcode> {
        console.log('reached');
        const productTax= await this.getTax();
        return this.productRepository.getProductBarcode(code, productTax); 
    }

    getProductWarning(): Promise<boolean> {
        return this.productRepository.getProductWarning();
    }

    private async getTax() {
        const queryTax = this.config.createQueryBuilder('configuration');
        queryTax.select('configuration.tax');
        queryTax.where('configuration.id = 1');
        let tax = await queryTax.getOne();
        
        return tax.tax;
      }

    
}
