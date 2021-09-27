import { Body, Controller, Get, Post, UseGuards, Param, Query } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(AuthGuard())
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    getProducts(@Query('param') param: string): Promise<Product[]> {
        return this.productService.getProducts(param);
    }
    
    @Get('warning')
    getProductWarning(): Promise<boolean> {        
        return this.productService.getProductWarning();
    }

    @Get(':code')
    getProducBarcode(@Param('code') code: string) {
        return this.productService.getProductBarcode(code);
    }

}
