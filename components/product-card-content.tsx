"use client";
import { getProducts } from "@/app/api/services/productService";
import { useEffect, useState } from "react";
import ProductItem from "./product-item";
import { ProductItemModel } from "@/app/models/product";
import { reloadProductsEmitter } from "./basket";



interface ProductCardContentProps {
  user?: any;
}
const ProductCardContent: React.FC<ProductCardContentProps> = ({ user }) => {
  const [products, setProducts] = useState<ProductItemModel[]>([]);
  useEffect(() => {
    fetchData();

    reloadProductsEmitter.on("update", fetchData);
    return () => {
      reloadProductsEmitter.off("update", fetchData);
    };


  }, []);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      if (res.status !== 200) {
        throw new Error("User ile ilgili bir hata oluştu");
      }
      setProducts(res.data);
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
