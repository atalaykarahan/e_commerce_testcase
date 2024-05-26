import UserModel from "../models/user";

export const getUserByName = async (user_name: string) => {
  const user = await UserModel.findOne({
    where: { user_name: user_name },
  });

  if (!user) return null;

  const { user_password, ...result } = user["dataValues"];
  return result;
};

export const getUserByEmail = async (user_email: string) => {
  const user = await UserModel.findOne({
    where: { user_email: user_email },
  });

  if (!user) return null;

  const { user_password, ...result } = user["dataValues"];
  return result;
};
