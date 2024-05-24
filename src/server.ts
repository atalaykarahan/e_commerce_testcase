import express from "express";
const app = express();
const port = 4006;

import db from "../db";

//Test Db
db.authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log("Error: " + err));


app.get("/", (req, res) => {
    res.send("api is success")
})


app.listen(port!, () => {
    console.log(`Server running on port: ${port}`)
})