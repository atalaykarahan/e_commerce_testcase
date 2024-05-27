import { redisClient } from "../server";
import * as ProductService from "./product";

//#region ADD
interface basketItem {
  product_id: string;
  product_title: string;
  quantity: number;
  product_price: number;
}
export const addToBasket = async (user_id: string, product_id: string) => {
  const basketKey = `basket:${user_id}`;

  //get user basket
  const basket = await redisClient.get(basketKey);
  let items: basketItem[] = basket ? JSON.parse(basket) : [];

  const existingItem = items.find((i) => i.product_id === product_id);

  const product = await ProductService.getProductById(product_id);
  if (!product) return null;

  //sepette bu urunden var demektir
  if (existingItem) {
    if (product.product_stock_quantity >= existingItem.quantity + 1) {
      existingItem.quantity += 1;
    } else {
      return null;
    }
  } else {
    if (product.product_stock_quantity > 0) {
      const prodcut: basketItem = {
        product_id: product.product_id,
        product_title: product.product_title,
        quantity: 1,
        product_price: product.product_price,
      };
      items.push(prodcut);
    } else {
      return null;
    }
  }
  await redisClient.set(basketKey, JSON.stringify(items));
  return true;
};

//#endregion
