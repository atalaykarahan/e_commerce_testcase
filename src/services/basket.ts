import createRabbit from "../../rabbitmq";
import { productDTO } from "../models/dto/product";
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

  //   const product = await ProductService.getProductById(product_id);
  const productsCache = await redisClient.get("products");
  let products: productDTO[] = productsCache ? JSON.parse(productsCache) : [];
  const selectedProductCache = products.find(
    (i) => i.product_id === product_id
  );
  if (!selectedProductCache) return null;

  //sepette bu urunden var demektir
  if (existingItem) {
    if (
      selectedProductCache.product_stock_quantity >=
      existingItem.quantity + 1
    ) {
      existingItem.quantity += 1;
    } else {
      return null;
    }
  } else {
    if (selectedProductCache.product_stock_quantity > 0) {
      const prodcut: basketItem = {
        product_id: selectedProductCache.product_id,
        product_title: selectedProductCache.product_title,
        quantity: 1,
        product_price: selectedProductCache.product_price,
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

//#region REMOVE
interface basketItem {
  product_id: string;
  product_title: string;
  quantity: number;
  product_price: number;
}
export const removeFromBasket = async (user_id: string, product_id: string) => {
  const basketKey = `basket:${user_id}`;

  //get user basket
  const basket = await redisClient.get(basketKey);
  let items: basketItem[] = basket ? JSON.parse(basket) : [];

  //kullanicinin sepetindeki urun
  const existingItem = items.find((i) => i.product_id === product_id);

  //cache icindeki tum urunler
  const productsCache = await redisClient.get("products");
  let products: productDTO[] = productsCache ? JSON.parse(productsCache) : [];

  //cache icindeki istenilen urun
  const selectedProductCache = products.find(
    (i) => i.product_id === product_id
  );
  if (!selectedProductCache) return null;

  if (existingItem && existingItem?.quantity >= 2) {
    if (selectedProductCache.product_stock_quantity >= existingItem.quantity) {
      existingItem.quantity -= 1;
    } else {
      return null;
    }
  } else if (existingItem) {
    items = removeItemByProductId(items, existingItem.product_id);
  }
  await redisClient.set(basketKey, JSON.stringify(items));
  return true;
};
//#endregion

//#region GET BASKET
export const getBasket = async (user_id: string) => {
  const basketKey = `basket:${user_id}`;

  //get user basket
  const basket = await redisClient.get(basketKey);
  let items: basketItem[] = basket ? JSON.parse(basket) : [];

  if (!items) return null;

  //ara toplam
  const subTotal = parseFloat(
    items
      .reduce((sum, item) => sum + item.product_price * item.quantity, 0)
      .toFixed(2)
  );
  let total = subTotal;
  let gift = false;

  //kargo ucreti
  const shippingCost = subTotal > 500 ? 0 : 54.99;

  //%10 indirim
  if (subTotal > 1000 && subTotal < 1500) {
    total = subTotal - subTotal * 0.1; //%10 indirim;
    gift = false;
  } else if (subTotal > 1500 && subTotal < 2000) {
    gift = false;
    total = subTotal - subTotal * 0.15;
  } else if (subTotal > 2000 && subTotal < 3000) {
    gift = false;
    total = subTotal - subTotal * 0.2;
  } else if (subTotal > 3000) {
    total = subTotal - subTotal * 0.25;
    gift = true;
  }

  total = parseFloat(total.toFixed(2));

  return { items, total, subTotal, gift, shippingCost };
};
//#endregion

//#region ORDER
export const order = async (user_id: string) => {
  const rabbitConnnection = await createRabbit();
  const rabbitChannel = await rabbitConnnection?.createChannel();

  if (!rabbitConnnection) return null;
  await rabbitChannel?.assertQueue("order", { durable: true });

  const userBasket = await getBasket(user_id);
  if (!userBasket) return null;

  rabbitChannel?.sendToQueue("order", Buffer.from(JSON.stringify(userBasket)), {
    persistent: true,
  });
  return true
};

//#endregion

function removeItemByProductId(items: basketItem[], productIdToRemove: string) {
  return items.filter((item) => item.product_id !== productIdToRemove);
}
