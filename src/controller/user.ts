import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";

import env from "../util/validateEnv";
import { sendVerifyMail } from "../util/mail";

//#region SIGNUP
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
    const existingUsername = await UserModel.findOne({
      where: { user_name: user_name },
    });

    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead."
      );
    }

    const existingEmail = await UserModel.findOne({
      where: { user_email: user_email },
    });

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
    console.log("bir alt satırda mail yollanmalı");
    const token = jwt.sign(obj, env.JWT_SECRET, { expiresIn: "5m" });
    const confirmLink = `https://localhost.com:300/new-verification?token=${token}`;

    const mail = await sendVerifyMail(user_email, confirmLink);
    if (mail) {
      console.log("yollanmış olmalı");
    } else {
      console.log("yollananmdı");
      return false;
    }

    res.status(201).json({ message: "mail sent" });
  } catch (error) {
    next(error);
  }
};

// function sendMail(transporter: any, mailOptions: any) {
//   throw new Error("Function not implemented.");
// }
//#endregion
