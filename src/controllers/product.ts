import { RequestHandler } from "express";
import * as ProductService from "../services/product";

//#region GET ALL PRODUCTS /api/products/
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//#endregion
