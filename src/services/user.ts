import UserModel from "../models/user";

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
  return result;
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
