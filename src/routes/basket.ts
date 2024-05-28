import express from "express";
import * as BasketController from "../controllers/basket"
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

//get basket
router.get("/",requiresAuth, BasketController.getBasket);

//add item
router.patch("/add",requiresAuth, BasketController.addItem);

//remove item
router.patch("/remove",requiresAuth, BasketController.removeItem);

router.get("/order", requiresAuth, BasketController.orderBasket);

export default router;