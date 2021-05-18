import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
    }

    getProducts(): Promise<Product[]> {
        return this.productRepository.getProducts();
    }
    
}
