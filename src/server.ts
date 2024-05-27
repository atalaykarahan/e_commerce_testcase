import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import basketRoutes from "./routes/basket";
import env from "./util/validateEnv";
import Redis from "ioredis";
import connectRedis from "connect-redis";

const app = express();
const port = env.EXPRESS_PORT;

import db from "../db";
import { storeProductsToCache } from "./services/product";

//Test Db
db.authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log("Error: " + err));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev"));

// for post methods
app.use(express.json());

const RedisStore = require("connect-redis").default;
//bos birakınca default olan 6379a baglanir
export const redisClient = new Redis({});

app.use(
  session({
    name: env.COOKIE_NAME,
    store: new RedisStore({ client: redisClient, Touch: false }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false, //gelistirme sureci diye false yaptim
    },
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Product routes api/products
app.use("/api/products", productRoutes);

// User routes api/users
app.use("/api/users", userRoutes);

// User routes api/basket
app.use("/api/basket", basketRoutes);

// Basket routes api/basket
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(port!, async () => {
  console.log(`Server running on port: ${port}`);
  await loadProductsToCache();
});
async function loadProductsToCache() {
  try {
    await storeProductsToCache();
    console.log('Tüm ürünler Redis cache\'e yüklendi.');
  } catch (error) {
    console.error('Ürünleri yüklerken hata:', error);
  }
}

