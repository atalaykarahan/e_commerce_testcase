import { cookies } from "next/dist/client/components/headers";
import axios from "../axios";



export const addItem = async (product_id:string) => {
  return await axios.post("/basket",{product_id});
};
