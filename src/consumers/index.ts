import createRabbit from "../../rabbitmq";
import * as BasketService from "../services/basket";
import * as ProductService from "../services/product";
import { sendOrderMail } from "../util/mail";

export const consumer = async (quequeName: string) => {
  const connection = await createRabbit();
  const channel = await connection?.createChannel();

  await channel?.consume(quequeName, async (msg: any) => {
    if (quequeName == "order") {
      const data = JSON.parse(msg.content.toString());
      // Önce stok kontrolü yapılabilir
      const itemsProcessed = [];
      for (const item of data.items) {
        const discardDb = await ProductService.discardQuantity(
          item.product_id,
          item.quantity
        );
        if (discardDb) {
          itemsProcessed.push(item);
        } else {
          console.log(
            `Stok yetersiz: Ürün ${item.product_id} için işlem iptal edildi.`
          );
        }
      }

      // Eğer tüm ürünler işlem gördüyse (stok yeterliyse)
      if (itemsProcessed.length === data.items.length) {
        // Kullanıcı sepetini temizle ve mail gönder
        await BasketService.clearBasket(data.user_id);
        const mailSent = await sendOrderMail(
          data.user_email,
          JSON.stringify(data)
        );

        if (!mailSent) {
          throw new Error("Sipariş onay maili gönderilemedi.");
        }
      }

      console.log("Order processed successfully.");
      channel.ack(msg); // Mesajı onayla (başarılı işlem)
      // if (discardDb) {
      //   //kim siparis verebilir ise onun siparisleri dusmeli burdan ve o kisiye mail gitmeli
      //   await BasketService.clearBasket(data.user_id);
      //   const mail = await sendOrderMail(data.user_email, JSON.stringify(data));
      //   if (!mail) {
      //     console.log("mail yollanamadı");
      //   }
      // }

   
    }
  });
};


