import prisma from "../lib/prisma.ts";

export const getAllBlogs = async (req, res) => {
    const blogs = await prisma.blog.findMany();

    return res.json(blogs);
}

export const getBlog = async (req, res) => {
    const {id} = req.params;

    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        }
    });

    if (!blog) {
        res.status("404").send("Blog not Found");
    }

    res.json(blog);
}

export const postBlog = async (req, res) => {
    const {title, content} = req.body

    try {
        await prisma.blog.create({
            data: {
                title,
                content,
                userId: req.user.id
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create post");
    }

    res.redirect("/blogs");
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params;

    try {
        await prisma.blog.delete({
            where: {
                id: id
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete post");
    }
}

export const updateBlog = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;

    try {
        await prisma.blog.update({
            where: {
                id: id
            },
            data: {
                title,
                content
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update post");
    }

    res.redirect("/blogs");   
}