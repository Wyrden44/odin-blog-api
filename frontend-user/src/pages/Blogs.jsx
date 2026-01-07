import { useEffect, useState } from "react";
import { fetchBlogs } from "../api/blogs";
import { useAuth } from "../context/AuthContext";
import "./Blogs.css";
import { getTimeAgo } from "../utils/date";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

export default function Blogs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const {user} = useAuth();
    const navigate = useNavigate();

    const goToBlog = (id) => {
        navigate(`/blogs/${id}`)
    }

    console.log(user);

    useEffect(() => {
        // Fetch blogs from API when component mounts
        async function fetchData() {
            const data = await fetchBlogs(user?.token);
            if (!data) return;
            setBlogs(data);
            setLoading(false);
        }
        fetchData();
    }, [user?.token]);

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
                        if (searchTerm) {
                            return blog.title.includes(searchTerm);
                        }
                        return true;
                    }).map((blog) => (
                    <div key={blog.id} className="blog-item" onClick={() => goToBlog(blog.id)}>
                        <div className="blog-item-header">
                            <p className="blog-item-user">{blog.user.username}</p>
                            <p className="blog-item-date">{getTimeAgo(blog.createdAt)}</p>
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
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}