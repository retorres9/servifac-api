import { EntityRepository, Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./create-category.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const {cat_name} = createCategoryDto;
        const category = new Category();
        category.cat_name = cat_name;
        try {
            return category.save();
        } catch (error) {
            console.log(error);
        }
    }

    getCategories(): Promise<Category[]> {
        const query = this.createQueryBuilder('category');
        const categories = query.getMany();
        return categories;
    }
}