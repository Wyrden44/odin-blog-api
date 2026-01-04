import { Router } from "express";
import { login, signup } from "../controllers/authController.js";

const authRouter = new Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);

export default authRouter;