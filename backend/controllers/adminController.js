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
        res.status(500).json({errors: "Failed to post Blog"});
    }

    res.redirect("/blogs");
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params;

    const blogId = Number(id);

    if (isNaN(blogId)) {
        return res.status(400).json({ message: "Invalid blog id" });
    }

    try {
        await prisma.blog.delete({
            where: {
                id: blogId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({errors: "Failed to delete Blog"});
    }

    res.json({msg: "Successfully deleted Blog"});
}

export const updateBlog = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;

    const blogId = Number(id);

    if (isNaN(blogId)) {
        return res.status(400).json({ message: "Invalid blog id" });
    }

    try {
        await prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                title,
                content
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({errors: "Failed to update post"});
    }

    res.json({message: "Successfully updated Blog"});
}

export const deleteComment = async (req, res) => {
    const {id, commentId} = req.params;

    const blogId = Number(id);

    const commentIdNum = Number(commentId);

    if (isNaN(blogId) || isNaN(commentIdNum)) {
        return res.status(400).json({ message: "Invalid" });
    }

    try {
        await prisma.comment.deleteMany({
            where: {
                id: commentIdNum,
                blogId: blogId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({errors: "Failed to delete comment"});
    }

    res.json({ message: "Comment deleted successfully" });
}