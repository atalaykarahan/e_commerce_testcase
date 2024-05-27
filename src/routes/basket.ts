import express from "express";
import * as BasketController from "../controllers/basket"
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

//get basket
router.get("/",requiresAuth, BasketController.getBasket);

//add item
router.post("/", BasketController.addItem);

export default router;