import ProductModel from "../models/product";

export const getProducts = async () => {
  const products = await ProductModel.findAll();
  return products;
};
