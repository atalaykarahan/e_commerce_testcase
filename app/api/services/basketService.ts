import axios from "../axios";

export const addItem = async (product_id: string) => {
  return await axios.patch("/basket/add", { product_id });
};

export const removeItem = async (product_id: string) => {
  return await axios.patch("/basket/remove", { product_id });
};

export const getBasket = async () => {
  return await axios.get("/basket");
};
