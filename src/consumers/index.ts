import createRabbit from "../../rabbitmq";
import * as BasketService from "../services/basket";
import * as ProductService from "../services/product";
import { sendOrderMail } from "../util/mail";

const consumer = async (quequeName: string) => {
  const connection = await createRabbit();
  const channel = await connection?.createChannel();

  await channel?.consume(quequeName, async (msg: any) => {
    if (quequeName == "order") {
      const data = JSON.parse(msg.content.toString());
      console.log("rabbit mq dan okunan data", data);
      for (const item of data.items) {
        await ProductService.discardQuantity(item.product_id, item.quantity);
        await ProductService.discardProductsStockInCache(
          item.product_id,
          item.quantity
        );
      }
      await BasketService.clearBasket(data.user_id);
      const mail = await sendOrderMail(data.user_email, JSON.stringify(data));
      if (!mail) {
        channel.nack(msg, false, true);
      }
      channel.ack(msg);
    }
  });
};

consumer("order");
