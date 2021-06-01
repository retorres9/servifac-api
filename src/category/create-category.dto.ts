import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'Category name shouldn\'t be empty'
  })
  cat_name: string;
}