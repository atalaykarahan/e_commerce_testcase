import { cookies } from "next/dist/client/components/headers";
import axios from "../axios";



export const getMyCookie = () => {
  try {
    const cStore = cookies();
    const cookees = cStore.get("sessid");
    const readable = cookees?.name + "=" + cookees?.value;
    return readable;
  } catch (error) {
    return { error: "Cookie bulunamadı!" };
  }
};

export const signUp = (user: any) => {
  const props = {
    user_name: user.user_name,
    user_email: user.user_email,
    user_password: user.user_password,
    user_surname: user.user_surname,
  };

  return axios.post(`/users/signup`, props);
};

export const verifiedEmail = (token: string) => {
  return axios.post(`/users/email-verified`, { token: token });
};

export const logOut = async () => {
  return axios.post(`/users/logout`);
};

export const getLoggedInUserServer = async () => {
  const query = await fetch(`${process.env.BASE_URL}/users`, {
    headers: {
      Cookie: `${getMyCookie()}`,
    },
  });
  const response = await query.json();
  return response;
};
