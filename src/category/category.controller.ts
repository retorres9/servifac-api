import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './create-category.dto';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories();
    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(createCategoryDto);
    }
}
