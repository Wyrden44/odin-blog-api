import express from "express";
import "dotenv/config";
import mainRouter from "./routers/mainRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);

app.listen(process.env.PORT || 3000, err => {
    if (err) {
        throw err;
    }
    console.log("App is running!");
});