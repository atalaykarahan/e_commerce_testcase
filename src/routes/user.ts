import express from "express";
import * as UserController from "../controllers/user"
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

//sign up user
router.post("/signup", UserController.signUp);

//email verified
router.post("/email-verified", UserController.emailVerified);

//login
router.post("/login", UserController.login);

//logout and clear session
router.post("/logout", requiresAuth, UserController.logout);

//chech if user has a valid session
router.get("/", requiresAuth, UserController.getAuthenticatedUser);

export default router;