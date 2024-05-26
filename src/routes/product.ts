import express from "express";
import * as ProductController from "../controllers/product"

const router = express.Router();

//get all products
router.get("/", ProductController.getProducts);

export default router;