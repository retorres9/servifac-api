import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}

    createCategory(createCategory: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.createCategory(createCategory);
    }

    getCategories(): Promise<Category[]> {
        return this.categoryRepository.getCategories();
    }
    
}
