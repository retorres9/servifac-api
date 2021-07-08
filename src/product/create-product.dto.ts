import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product name shouldn\'t be empty'})
    prod_name: string;

    @IsNotEmpty({message: 'Product code shouldn\'t be empty'})
    @MaxLength(13, {message: 'Product code exceded max lenght 13'})
    prod_code: string;
    
    @IsNotEmpty({message: 'Product price shouldn\'t be empty'})
    @IsNumber()
    prod_price: number;

    @IsNotEmpty()
    @IsNumber()
    prod_retailPrice: number;

    @IsNotEmpty()
    @IsNumber()
    prod_wholesalePrice: number
    
    @IsNumber()
    prod_quantity: number;
    
    @IsNumber()
    prod_minQuantity: number;
    
    prod_inStock: boolean;
    // Warehouse Stock
    war_id?: number;
    
    @IsOptional()
    @IsNumber()
    wrs_quantity: number;

    // Category
    @IsOptional()
    @IsNumber()
    cat_id?: number;

    // Location
    @IsOptional()
    @IsNumber()
    loc_id?: number;

    // Providers
    ppr_productProvider?: string;
}