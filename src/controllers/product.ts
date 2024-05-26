
import { RequestHandler } from "express";
import ProductModel from "../models/product"

//#region GET ALL PRODUCTS
export const getProducts : RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}
//#endregion