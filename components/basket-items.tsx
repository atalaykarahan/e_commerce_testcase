"use client";
import {
  ChevronLeft,
  ChevronRight,
  CircleMinus,
  CirclePlus,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { basketModel } from "./basket";
import { addItem, removeItem } from "@/app/api/services/basketService";
import { toast } from "sonner";
import { reloadMyBasketEmitter } from "./product-item";

interface BasketItemsProps {
  products?: basketModel[];
}
const BasketItems: React.FC<BasketItemsProps> = ({ products }) => {
  const plusItem = async (product_id: string) => {
    await addItem(product_id).then(
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
  const discardItem = async (product_id: string) => {
    await removeItem(product_id).then(
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
    <Table>
      <TableHeader>
        <TableRow></TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.product_id}>
            <TableCell className="font-semibold">
              {product.product_title}
            </TableCell>
            <TableCell>
              <Label>{product.quantity}</Label>
            </TableCell>
            <TableCell>
              <Label>{product.product_price}</Label>
            </TableCell>
            <TableCell>
              <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      onClick={() => discardItem(product.product_id)}
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                    >
                      <CircleMinus className="h-3.5 w-3.5" />
                      <span className="sr-only">Çıkart</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      onClick={() => plusItem(product.product_id)}
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                    >
                      <CirclePlus className="h-3.5 w-3.5" />
                      <span className="sr-only">Ekle</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BasketItems;
