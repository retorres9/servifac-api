import { EntityRepository, Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./create-category.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const {cat_name} = createCategoryDto;
        const category = this.create({
            cat_name
        });
        try {
            await category.save();
        } catch (error) {
            console.log(error);
        }
        return category;
    }

    async getCategories(): Promise<Category[]> {
        const query = this.createQueryBuilder('category');
        return query.getMany();
    }
}