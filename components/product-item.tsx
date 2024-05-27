"use client";
import { addItem } from "@/app/api/services/basketService";
import { ProductItemModel } from "@/app/models/product";
import EventEmitter from "events";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const reloadMyBasketEmitter = new EventEmitter();

interface ProductItemProps {
  product: ProductItemModel;
  user?: any;
}
const ProductItem: React.FC<ProductItemProps> = ({ product, user }) => {
  const onClick = async () => {
    await addItem(product.product_id).then(
      (res: any) => {
        console.log("eklendi");
        reloadMyBasketEmitter.emit("update");
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
