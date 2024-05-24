import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ProductItemModel {
  product_id: number;
  title: string;
  category_id: number;
  category_title: string;
  description: string;
  price: number;
  stock_quantity: number;
  origin: string;
  roast_level: string;
  flavor_notes: string[];
}

interface ProductItemProps {
  product: ProductItemModel;
}
const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Card className="w-[325px]">
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Kategori:</strong> {product.category_title}
        </p>
        <p>
          <strong>Fiyat:</strong> {product.price}₺
        </p>
        <p>
          <strong>Stok Miktarı:</strong> {product.stock_quantity}
        </p>
        <p>
          <strong>Menşei:</strong> {product.origin}
        </p>
        <p>
          <strong>Kavurma Seviyesi:</strong> {product.roast_level}
        </p>
        <p>
          <strong>Aroma Notları:</strong> {product.flavor_notes.join(", ")}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Sepete Ekle</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
