export interface productDTO {
  product_id: string;
  product_title: string;
  product_description: string;
  product_price: number;
  product_stock_quantity: number;
  product_origin: string;
  product_roast_level: string;
  category: category;
  flavors: flavor[];
}
export interface category {
  category_id: string;
  category_title: string;
}

export interface flavor {
  flavor_id: string;
  note: string;
}
