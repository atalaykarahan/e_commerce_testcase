import UserModel from "../models/user";
import bcrypt from "bcrypt";

//#region GET BY NAME
export const getUserByName = async (user_name: string) => {
  const user = await UserModel.findOne({
    where: { user_name: user_name },
  });

  if (!user) return null;

  const { user_password, ...result } = user["dataValues"];
  return result;
};
//#endregion

//#region GET BY MAIL
export const getUserByEmail = async (user_email: string) => {
  const user = await UserModel.findOne({
    where: { user_email: user_email },
  });

  if (!user) return null;

  const { user_password, ...result } = user["dataValues"];
  return user;
};
//#endregion

//#region CREATE
export const createUser = async (
  user_name: string,
  user_email: string,
  user_password: string,
  user_surname?: string
) => {
  await UserModel.create({
    user_name: user_name,
    user_email: user_email,
    user_password: user_password,
    user_surname: user_surname,
  });
  return true;
};
//#endregion

//#region LOGIN
export const validateUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({
    where: { user_email: email },
  });

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.user_password);

  if (!passwordMatch) return null;
  const { user_password, ...result } = user["dataValues"];
  return result;
};
//#endregion

//#region GET BY ID
export const getUserById = async (user_id: string) => {
  const user = await UserModel.findByPk(user_id);
  if (!user) return null;

  const { user_password, ...result } = user["dataValues"];

  return result;
};
//#endregion