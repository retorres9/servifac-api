import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';
import { Param } from '@nestjs/common';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(AuthGuard())
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }
    
    @Get('war')
    getProductWarning(): Promise<boolean> {
        console.log('here');
        
        return this.productService.getProductWarning();
    }

    @Get(':code')
    getProducBarcode(@Param('code') code: string) {
        console.log(code);
        
        return this.productService.getProductBarcode(code);
    }

}
