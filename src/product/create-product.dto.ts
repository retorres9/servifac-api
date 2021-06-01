import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export class CreateProductDto {
    prod_name: string;

    @IsNotEmpty({
        message: 'Product code shouldn\'t be empty'
    })
    @MaxLength(13, {
        message: 'Product code exceded max lenght 13'
    })
    prod_code: string;
    
    @IsNotEmpty({
        message: 'Product price shouldn\'t be empty'
    })
    prod_price: string;
    prod_inStock: boolean;
    prod_quantity: string;

    // Warehouse Stock
    war_id?: number;

    @IsNumber()
    wrs_quantity: number;

    // Category
    @IsNumber()
    cat_id?: number;

    // Location
    @IsNumber()
    loc_id?: number;

    // Providers
    ppr_productProvider?: string[];
}