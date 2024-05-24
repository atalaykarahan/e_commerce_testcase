import express from "express";
const app = express();
const port = undefined;

app.get("/", (req, res) => {
    res.send("api is success")
})


app.listen(port!, () => {
    console.log(`Server running on port: ${port}`)
})