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

    res.json({message: "Successfully updated Blog"});
}

export const deleteComment = async (req, res) => {
    const {id, commentId} = req.params;

    try {
        await prisma.comment.deleteMany({
            where: {
                id: commentId,
                blogId: id
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete comment");
    }

    res.json({ message: "Comment deleted successfully" });
}