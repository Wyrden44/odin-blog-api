import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteBlog, getAllBlogs } from "../api/blogs";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import "./Blogs.css";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const {user, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const goToBlog = (id) => {
        navigate(`/blogs/${id}`)
    }

    const onEditButtonSubmit = (id) => {
        navigate(`/blogs/${id}`);
    }

    const onDeleteButtonSubmit = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const res = await deleteBlog(id, user.token);
        if (!res.ok) {
            alert(res.errors);
            return;
        }
        
        // update blogs
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));

    }

    const fetchBlogs = async () => {
        setLoading(true);
        const data = await getAllBlogs(user?.token);
        setLoading(false);
        if (!data) return;
        setBlogs(data);
    }

    useEffect(() => {
        fetchBlogs();
    }, [user])

    return (
        <section className="blogs">
            <div className="search-blogs">
                <div className="search-blogs-input-wrapper">
                    <input type="text" placeholder="Search blogs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <img src="/icons/search.png" alt="search" />
                </div>
            </div>
            <div className="blog-list">
                {loading && <p>Loading blogs...</p>}
                {!loading && blogs.length === 0 && <p>No blogs found.</p>}
                {!loading && blogs.filter(blog => {
                        console.log(blog.title)
                        if (searchTerm) {
                            return blog.title.includes(searchTerm);
                        }
                        return true;
                    }).map((blog) => (
                    <div key={blog.id} className="blog-item" onClick={() => goToBlog(blog.id)}>
                        <div className="blog-item-header">
                            <p className="blog-item-user">{blog.user.username}</p>
                            <p className="blog-item-date">{blog.createdAt}</p>
                        </div>
                        <div className="blog-item-content">
                            <h2>{blog.title}</h2>
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blog.content)}}/>
                        </div>
                        <div className="blog-item-actions">
                            <div className="blog-item-comments">
                                <img src="/icons/comment.png" alt="comment" />
                                <p>{blog.comments.length}</p>
                            </div>
                            <div className="blog-item-admin-actions">
                                <button type="button" onClick={() => onEditButtonSubmit(blog.id)}>Edit</button>
                                <button type="button" className="blog-item-admin-actions-delete" onClick={(e) => onDeleteButtonSubmit(e, blog.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}