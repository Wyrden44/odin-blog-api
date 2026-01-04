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

