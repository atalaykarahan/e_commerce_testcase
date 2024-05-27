"use client";
import { getProducts } from "@/app/api/services/productService";
import { useEffect, useState } from "react";
import ProductItem, { ProductItemModel } from "./product-item";



interface ProductCardContentProps {
  user?: any;
}
const ProductCardContent: React.FC<ProductCardContentProps> = ({ user }) => {
  const [products, setProducts] = useState<ProductItemModel[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }
      setProducts(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {products.map((product) => (
        <ProductItem key={product.product_id} user={user} product={product} />
      ))}
    </>
  );
};

export default ProductCardContent;
