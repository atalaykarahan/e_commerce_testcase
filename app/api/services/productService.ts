import { cookies } from "next/dist/client/components/headers";
import axios from "../axios";



export const getProducts = async () => {
  return await axios.get("/products");
};
