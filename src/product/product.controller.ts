import { Body, Controller, Get, Post, UseGuards, Param, Query, Put } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProdQtyDto } from './Model/update-product.dto';


@UseGuards(AuthGuard())
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
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

    @Get('minimums')
    getProductMinimums() {
        return this.productService.getProductMinimums();
    }

    
    @Get(':code')
    getProducBarcode(@Param('code') code: string) {
        return this.productService.getProductBarcode(code);
    }
    
    @Get('inventory/:criteria')
    getProductsInventory(@Param('criteria') criteria: string): Promise<Product[]> {
        return this.productService.getProductsInventory(criteria);
    }

    @Put('update')
    updateProductQty(@Body() updateProdQtyDto: UpdateProdQtyDto) {
        return this.productService.updateProduQty(updateProdQtyDto);
    }
}
