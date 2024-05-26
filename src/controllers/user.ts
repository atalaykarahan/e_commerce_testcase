import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import * as UserService from "../services/user";
import bcrypt from "bcrypt";

import { sendVerifyMail } from "../util/mail";
import env from "../util/validateEnv";

//#region SIGNUP /api/users/signup
interface SignUpBody {
  user_name?: string;
  user_email?: string;
  user_password?: string;
  user_surname?: string;
}
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;
  const user_surname = req.body.user_surname;

  try {
    if (!user_name || !user_email || !user_password) {
      throw createHttpError(400, "Missing parameters");
    }

    // Check same username
    const existingUsername = await UserService.getUserByName(user_name);

    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead."
      );
    }

    const existingEmail = await UserService.getUserByEmail(user_email);

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email adress already exists. Please log in instead."
      );
    }
    let obj = {};
    // if user has give a surname then we add inside a token
    if (user_surname) {
      obj = {
        user_name: user_name,
        user_email: user_email,
        user_password: user_password,
        user_surname: user_surname,
      };
    } else {
      obj = {
        user_name: user_name,
        user_email: user_email,
        user_password: user_password,
      };
    }
    const token = jwt.sign(obj, env.JWT_SECRET, { expiresIn: "5m" });
    const confirmLink = `http://localhost:3000/mail-verification?token=${token}`;

    const mail = await sendVerifyMail(user_email, confirmLink);
    if (!mail) {
      throw createHttpError(409, "Mail could not be sent.");
    }

    res.status(201).json({ message: "mail sent" });
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region EMAIL VERIFIED /api/users/email-verified
interface EmailVerifiedBody {
  token?: string;
}
export const emailVerified: RequestHandler<
  unknown,
  unknown,
  EmailVerifiedBody,
  unknown
> = async (req, res, next) => {
  const incomingToken = req.body.token;

  try {
    if (!incomingToken) {
      throw createHttpError(400, "Missing parameters");
    }
    const decoded = jwt.verify(incomingToken, env.JWT_SECRET);

    if (decoded && typeof decoded !== "string") {
      // Check same username
      const existingUsername = await UserService.getUserByName(
        decoded.user_name
      );

      if (existingUsername) {
        throw createHttpError(
          409,
          "Username already taken. Please choose a different one or log in instead."
        );
      }

      // Check same email
      const existingEmail = await UserService.getUserByEmail(
        decoded.user_email
      );

      if (existingEmail) {
        throw createHttpError(
          409,
          "Username already taken. Please choose a different one or log in instead."
        );
      }

      const passwordHashed = await bcrypt.hash(decoded.user_password, 10);
      await UserService.createUser(
        decoded.user_name,
        decoded.user_email,
        passwordHashed,
        decoded.user_surname
      );

      res.status(201).json({ message: "User successfully created!" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // When token has been expired we have a custom error message for that
      return res.status(401).json({
        error:
          "Your token has been expired. Please try again verification process.",
      });
    }
    next(error);
  }
};
//#endregion EMAIL VERIFIED

//#region LOGIN /api/users/login
interface LoginBody {
  user_email?: string;
  user_password?: string;
}
export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;
  console.log(user_email, user_password)

  try {
    if (!user_email || !user_password) {
      throw createHttpError(400, "Missing parameters");
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(user_email))
      throw createHttpError(400, "Invalid format email");

    const user = await UserService.validateUser(user_email, user_password);

    if (!user) throw createHttpError(401, "Invalid credentials");

    req.session.user_id = user.user_id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
//#endregion LOGIN
