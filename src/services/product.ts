import { Op } from "sequelize";
import CategoryModel from "../models/category";
import FlavorModel from "../models/flavor";
import ProductModel from "../models/product";

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
export const getProductById = async (product_id:string) => {
  const product = await ProductModel.findByPk(product_id);
  if (!product) return null;
  return product;
};
//#endregion