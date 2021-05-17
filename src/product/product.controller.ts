import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }
}
