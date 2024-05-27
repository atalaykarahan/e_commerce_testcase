"use client";
import { Copy, Ticket } from "lucide-react";

import { getBasket } from "@/app/api/services/basketService";
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
import BasketItems from "./basket-items";
import TicketDialog from "./ticket-dialog";
import { Separator } from "./ui/separator";
import { reloadMyBasketEmitter } from "./product-item";
import EventEmitter from "event-emitter";
export interface basketModel {
  product_id: string;
  product_price: number;
  product_title: string;
  quantity: number;
}
const Basket = () => {
  const [tickedDialog, setTicketDialog] = useState<boolean>(false);
  const [basket, setBasket] = useState<basketModel[]>([]);
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
        <BasketItems products={basket} />

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Sipariş Detay</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Glimmer Lamps x <span>2</span>
              </span>
              <span>$250.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Ara Toplam</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Kargo</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Standart teslimat</span>
              <span>$25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Toplam</span>
              <span>$329.00</span>
            </li>
          </ul>
        </div>
       
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <Button>Satın al</Button>
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
