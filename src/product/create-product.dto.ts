export class CreateProductDto {
    prod_name: string;
    prod_code: string;
    prod_price: string;
    prod_inStock: boolean;
    prod_quantity: string;

    // Warehouse Stock
    war_id?: number;
    wrs_quantity: number;

    // Category
    cat_id?: number;

    // Location
    loc_id?: number;

    // Providers
    ppr_productProvider?: string[];
}