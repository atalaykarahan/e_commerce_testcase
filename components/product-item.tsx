"use client";
import { currentUser } from "@/lib/auth";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect } from "react";
import { addItem } from "@/app/api/services/basketService";
import { error } from "console";
import { toast } from "sonner";

interface categoryModel {
  category_id: string;
  category_title: string;
}
interface flavorModel {
  floavor_id: string;
  note: string;
}
export interface ProductItemModel {
  category: categoryModel;
  flavors?: flavorModel[];
  product_description: string;
  product_id: string;
  product_origin: string;
  product_price: string;
  product_roast_level: string;
  product_stock_quantity: number;
  product_title: string;
}

interface ProductItemProps {
  product: ProductItemModel;
  user?: any;
}
const ProductItem: React.FC<ProductItemProps> = ({ product, user }) => {
  const onClick = async () => {
    await addItem(product.product_id).then(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        if (
          error.response.data.error ===
          "Not enough stock for the requested quantity"
        ) {
          toast.error("Stokta kalmadı", {
            description: "Daha fazla eklemenin lüzumu yok. Elimizde kalmadı",
            position: "top-center",
          });
        } else {
          console.log(error);
        }
      }
    );
  };
  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>{product.product_title}</CardTitle>
        <CardDescription>{product.product_description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Kategori:</strong> {product.category.category_title}
        </p>
        <p>
          <strong>Fiyat:</strong> {product.product_price}₺
        </p>
        <p>
          <strong>Stok Miktarı:</strong> {product.product_stock_quantity}
        </p>
        <p>
          <strong>Menşei:</strong> {product.product_origin}
        </p>
        <p>
          <strong>Kavurma Seviyesi:</strong> {product.product_roast_level}
        </p>
        <p>
          {/* <strong>Aroma Notları:</strong> {product.flavors.note.join(", ")} */}
        </p>
      </CardContent>
      {user && (
        <CardFooter className="flex justify-between">
          <Button onClick={onClick}>Sepete Ekle</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductItem;
