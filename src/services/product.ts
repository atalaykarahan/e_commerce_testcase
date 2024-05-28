import { Op } from "sequelize";
import CategoryModel from "../models/category";
import FlavorModel from "../models/flavor";
import ProductModel from "../models/product";
import { redisClient } from "../server";
import { productDTO } from "../models/dto/product";

//#region GET PRODUCTS
export const getProducts = async () => {
  const products = await ProductModel.findAll({
    attributes: [
      "product_id",
      "product_title",
      "product_description",
      "product_price",
      "product_stock_quantity",
      "product_origin",
      "product_roast_level",
    ],
    include: [
      { model: CategoryModel },
      {
        model: FlavorModel,
        attributes: ["flavor_id", "note"],
        as: "flavors",
        through: { attributes: [] },
      },
    ],
    where: {
      product_stock_quantity: {
        [Op.gt]: 0,
      },
    },
  });
  return products;
};
//#endregion

//#region GET BY ID
export const getProductById = async (product_id: string) => {
  const product = await ProductModel.findByPk(product_id);
  if (!product) return null;
  return product;
};
//#endregion

//#region SET QUANTITY
export const discardQuantity = async (
  product_id: string,
  discardCount: number
) => {
  const product = await getProductById(product_id);
  if (!product) return null;

  product.product_stock_quantity -= discardCount;
  await product.save();
};
//#endregion

//#region STORE ALL PRODUCT CACHE
export const storeProductsToCache = async () => {
  const key = "products";

  const products = await getProducts();
  await redisClient.set(key, JSON.stringify(products));
  return true;
};
//#endregion

//#region DISCARD STOCK CACHE
export const discardProductsStockInCache = async (
  product_id: string,
  discardCount: number
) => {
  const productsCache = await redisClient.get("products");
  let products: productDTO[] = productsCache ? JSON.parse(productsCache) : [];

  const selectedProductCache = products.find(
    (i) => i.product_id === product_id
  );
  if (!selectedProductCache) return null;
  selectedProductCache.product_stock_quantity -= discardCount;

  //eger stok 0 olduysa cache icinden itemi cikarmak lazim
  if (selectedProductCache.product_stock_quantity == 0) {
    products = removeProductByProductId(
      products,
      selectedProductCache.product_id
    );
  }

  await redisClient.set("products", JSON.stringify(products));
};
//#endregion

function removeProductByProductId(items: any, productIdToRemove: string) {
  return items.filter((item: any) => item.product_id !== productIdToRemove);
}
