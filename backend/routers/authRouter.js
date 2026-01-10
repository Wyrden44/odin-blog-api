import { Router } from "express";
import { adminLogin, login, signup } from "../controllers/authController.js";

const authRouter = new Router();

authRouter.post("/admin/login", adminLogin);
authRouter.post("/login", login);
authRouter.post("/signup", signup);

export default authRouter;