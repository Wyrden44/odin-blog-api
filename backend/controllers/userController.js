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


export const postComment = async (req, res) => {
    const {id} = req.params;
    const {content} = req.body;

    try {
        const post = await prisma.comment.create({
            data: {
                content: content,
                userId: req.user.id,
                blogId: id
            }
        });

        res.json(post.id);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Unexpected error when posting comment");
    }
}