import axios from "../axios";

export const addItem = async (product_id: string) => {
  return await axios.post("/basket", { product_id });
};

export const getBasket = async () => {
  return await axios.get("/basket");
};
