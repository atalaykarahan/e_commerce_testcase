import createRabbit from "../../rabbitmq";

const consumer = async (quequeName: string) => {
  const connection = await createRabbit();
  const channel = await connection?.createChannel();

  await channel?.consume(quequeName, (msg: any) => {
    if(quequeName == "order"){
        const data = JSON.parse(msg.content.toString());
        console.log("rabbit mq dan okunan data", data);
        // channel.nack(msg, false, true)
        channel.ack(msg);
    }
   
  });
};

consumer("order")