"use client";
import { Copy, Ticket } from "lucide-react";

import { getBasket, order } from "@/app/api/services/basketService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BasketItems from "./basket-items";
import { reloadMyBasketEmitter } from "./product-item";
import TicketDialog from "./ticket-dialog";
import { Separator } from "./ui/separator";
import EventEmitter from "events";



export const reloadProductsEmitter = new EventEmitter();
export interface itemsModel {
  product_id: string;
  product_price: number;
  product_title: string;
  quantity: number;
}

export interface basketModel {
  items: itemsModel[];
  gift: boolean;
  shippingCost: number;
  subTotal: number;
  total: number;
}
const Basket = () => {
  const [tickedDialog, setTicketDialog] = useState<boolean>(false);
  const [basket, setBasket] = useState<basketModel>();
  const user = useCurrentUser();
  useEffect(() => {
    if (user) {
      fetchData();
    }

    reloadMyBasketEmitter.on("update", fetchData);
    return () => {
      reloadMyBasketEmitter.off("update", fetchData);
    };
  }, []);
  const fetchData = async () => {
    try {
      const res = await getBasket();
      if (res.status == 200) {
        setBasket(res.data);
      } else {
        console.log("bir hata oldu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buy = async () => {
    try {
      const res = await order();
      if (res.status == 200) {
        toast.success("SİPARİŞ İŞLEME DÜŞÜLDÜ", {
          description: "mailini kontrol et",
          position: "top-center",
        });
        reloadProductsEmitter.emit("update");
        reloadMyBasketEmitter.emit("update");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="overflow-hidden">
      {JSON.stringify(user)}
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order Oe31b70H
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: November 23, 2023</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1"
            onClick={() => setTicketDialog(true)}
          >
            <Ticket className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Kupon kodu giriniz.
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        {/* ornek bir adet siparis */}
        <BasketItems products={basket?.items} />

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Sipariş Detay</div>
          <ul className="grid gap-3">
            {basket?.items.map((item) => (
              <li
                key={item.product_id}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  {item.product_title} x <span>{item.quantity}</span>
                </span>
                <span>{(item.product_price * item.quantity).toFixed(2)} ₺</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Ara Toplam</span>
              <span>{basket?.subTotal}₺</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Kargo</span>
              <span>{basket?.shippingCost}₺</span>
            </li>
            {basket?.gift && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Bedava 1Kg kahve</span>
                <span>bedava :)</span>
              </li>
            )}

            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Toplam</span>
              <span>{basket?.total}₺</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <Button onClick={buy}>Satın al</Button>
        </div>
      </CardFooter>

      {TicketDialog && (
        <TicketDialog
          openModal={tickedDialog}
          closeModal={() => setTicketDialog(false)}
        />
      )}
    </Card>
  );
};

export default Basket;
