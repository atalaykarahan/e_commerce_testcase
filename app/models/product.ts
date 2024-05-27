import { categoryModel } from "./category";
import { flavorModel } from "./flavor";

export interface ProductItemModel {
    category: categoryModel;
    flavors?: flavorModel[];
    product_description: string;
    product_id: string;
    product_origin: string;
    product_price: string;
    product_roast_level: string;
    product_stock_quantity: number;
    product_title: string;
  }