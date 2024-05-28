import { RequestHandler } from "express";
import * as ProductService from "../services/product";
import createHttpError from "http-errors";
import { redisClient } from "../server";
import * as BasketService from "../services/basket";
import createRabbit from "../../rabbitmq";

//#region GET BASKET /api/basket/
export const getBasket: RequestHandler = async (req, res, next) => {
  try {
    const basket = await BasketService.getBasket(req.session.user_id);
    res.status(200).json(basket);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region ADD ITEM /api/basket/add
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

//#region REMOVE ITEM /api/basket/remove
interface addItemBody {
  product_id?: string;
}
export const removeItem: RequestHandler<
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

    const basketStatus = await BasketService.removeFromBasket(
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

//#region ORDER /api/basket/order
export const orderBasket: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.session.user_id;

    const order = await BasketService.order(user_id);
    if (!order) throw createHttpError(400, "Error processing order");

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
//#endregion

