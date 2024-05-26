import { RequestHandler } from "express";
import * as ProductService from "../services/product";

//#region GET ALL PRODUCTS
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = ProductService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//#endregion
