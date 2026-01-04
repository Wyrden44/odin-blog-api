import { Router } from "express";
import { getAllBlogs, getBlog } from "../controllers/userController.js";

const userRouter = new Router();

userRouter.get("/blogs", getAllBlogs);
userRouter.get("/blogs/:id", getBlog);

export default userRouter;