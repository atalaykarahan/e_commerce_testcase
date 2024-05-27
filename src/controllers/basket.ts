import { RequestHandler } from "express";
import * as ProductService from "../services/product";
import createHttpError from "http-errors";
import { redisClient } from "../server";
import * as BasketService from "../services/basket";

//#region GET BASKET /api/basket/
export const getBasket: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region ADD ITEM /api/basket/
interface addItemBody {
  product_id?: string;
}
export const addItem: RequestHandler<
  unknown,
  unknown,
  addItemBody,
  unknown
> = async (req, res, next) => {
  const product_id = req.body.product_id;

  try {
    if (!product_id) {
      throw createHttpError(400, "Missing parameters");
    }

    const basketStatus = await BasketService.addToBasket(
      req.session.user_id,
      product_id
    );
    if (!basketStatus)
      throw createHttpError(400, "Not enough stock for the requested quantity");

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

//#endregion
