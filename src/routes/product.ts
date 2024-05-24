import express from "express";
import * as ProductController from "../controller/product"

const router = express.Router();

//get all products
router.get("/", ProductController.getProducts);

export default router;