import { RequestHandler } from "express";
import createHttpError from "http-errors";

//only sign in user
export const requiresAuth: RequestHandler = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    next(createHttpError(401, "User not authenticated"));
  }
};

