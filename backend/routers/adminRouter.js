import { Router } from "express";
import { getAllBlogs, getBlog, postBlog, deleteBlog, updateBlog, deleteComment } from "../controllers/adminController.js";

const adminRouter = new Router();

adminRouter.get("/blogs", getAllBlogs);
adminRouter.get("/blogs/:id", getBlog);
adminRouter.post("/blogs", postBlog);
adminRouter.delete("/blogs/:id", deleteBlog);
adminRouter.put("/blogs/:id", updateBlog);
adminRouter.delete("blogs/:id/comments/:commentId", deleteComment);

export default adminRouter;