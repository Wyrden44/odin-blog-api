import prisma from "../lib/prisma.ts";

export const getAllBlogs = async (req, res) => {
    const blogs = await prisma.blog.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            comments: {
                select: {
                    id: true
                }
            }
        },
        orderBy: {createdAt: "desc"}
    });

    return res.json(blogs);
}

export const getBlog = async (req, res) => {
    const {id} = req.params;

    const blogId = Number(id);

    if (isNaN(blogId)) {
        return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                        }
                    }
                }
            }
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