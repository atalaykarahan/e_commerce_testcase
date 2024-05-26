import express from "express";
import * as UserController from "../controllers/user"

const router = express.Router();

//sign up user
router.post("/signup", UserController.signUp);

export default router;