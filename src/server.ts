import express, { NextFunction, Request, Response } from "express";
import productRoutes from "./routes/product";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
const app = express();
const port = 4006;

import db from "../db";

//Test Db
db.authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log("Error: " + err));

app.use(express.json());

app.use(morgan("dev"));

// for post methods
app.use(express.json());

// Book routes api/books
app.use("/api/products", productRoutes);

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

app.listen(port!, () => {
  console.log(`Server running on port: ${port}`);
});
