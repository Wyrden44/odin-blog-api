import { Router } from "express";
import { getAllBlogs, getBlog, postComment } from "../controllers/userController.js";

const userRouter = new Router();

userRouter.get("/blogs", getAllBlogs);
userRouter.get("/blogs/:id", getBlog);
userRouter.post("blogs/:id/comments", postComment);

export default userRouter;