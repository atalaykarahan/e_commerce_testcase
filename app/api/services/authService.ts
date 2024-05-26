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
