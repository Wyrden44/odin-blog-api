import { Router } from "express";
import adminRouter from "./adminRouter.js";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import { authenticate, checkAdmin } from "../middlewares/auth.js";

const mainRouter = new Router();

mainRouter.get("/", (req, res) => {
    res.redirect("/blogs");
});

mainRouter.use(authRouter);
mainRouter.use("/admin", authenticate, checkAdmin, adminRouter);
mainRouter.use(userRouter);

export default mainRouter;