import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { ProductBarcode } from './productBarcode.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationRepository } from '../configuration/configuration.repository';
import { UpdateProdQtyDto } from './Model/update-product.dto'

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository,
        @InjectRepository(ConfigurationRepository)
        private readonly config: ConfigurationRepository) { }

    createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
    }

    getProducts(param: string): Promise<Product[]> {
        return this.productRepository.getProducts(param);
    }

    async getProductBarcode(code: string): Promise<ProductBarcode> {
        const productTax = await this.getTax();
        return this.productRepository.getProductBarcode(code, productTax);
    }

    getProductWarning(): Promise<boolean> {
        return this.productRepository.getProductWarning();
    }

    async getProductsInventory(criteria: string): Promise<Product[]> {
        const productTax = await this.getTax();
        return this.productRepository.getProductsInventory(criteria, productTax);
    }

    getProductMinimums(): Promise<Product[]> {
        return this.productRepository.getProductMinimums();
    }

    updateProduQty(updateProdQtyDto: UpdateProdQtyDto): Promise<Product> {
        return this.productRepository.updateProductQty(updateProdQtyDto);
    }

    private async getTax() {
        const queryTax = this.config.createQueryBuilder('configuration');
        queryTax.select('configuration.tax');
        queryTax.where('configuration.id = 1');
        const taxEntity = await queryTax.getOne();
        return taxEntity.tax;
    }


}
