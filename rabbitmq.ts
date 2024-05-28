import amqplib from "amqplib";

export default async function createRabbit() {
  try {
    const connectionString = "amqp://guest:guest@localhost:5672/";
    const connection = await amqplib.connect(connectionString);
    return connection;
  } catch (error) {
    console.error(error);
    return null;
  }
}


