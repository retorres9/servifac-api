import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  cat_name: string;
}