import axios from "../axios";
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
