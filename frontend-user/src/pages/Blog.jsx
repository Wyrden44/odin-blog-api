import { useParams } from "react-router-dom";
import { fetchBlog, postComment } from "../api/blogs";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Blog.css";
import { getTimeAgo } from "../utils/date";
import DOMPurify from "dompurify";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [commentErrors, setCommentErrors] = useState([]);
  
  const { id } = useParams();
  const { user } = useAuth();

  const onCommentSubmit = async (e) => {
      e.preventDefault();

      const res = await postComment(user?.token, id, commentContent);

      if (!res.ok) {
        setCommentErrors(res.errors);
        return;
      }

      setCommentContent("");
      fetchData();
  }

  // Fetch blog from API when component mounts
  async function fetchData() {
      const data = await fetchBlog(user?.token, id);
      if (!data) return;
      console.log(data);
      setBlog(data);
      setLoading(false);
  }

  useEffect(() => {
      fetchData();
  }, [id, user?.token]);

  return (
    <section className="blog">
      {loading && <p>Loading blog...</p>}
      {!loading && blog && (
          <>
            <div className="blog-detail">
              <h1>{blog.title}</h1>
              <div className="blog-detail-subinfo">
                <p>Written by <span className="blog-detail-user">{blog.user.username}</span></p> 
                <p><span className="blog-detail-date">{getTimeAgo(blog.createdAt)}</span></p>
              </div>
            </div>
            <div className="blog-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blog.content)}}/>
            <div className="blog-comments">
              <h2>Comments ({blog.comments.length})</h2>
              <form onSubmit={onCommentSubmit} className="blog-comment-form">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder={user ? "What are your thoughts?" : "You must be logged in to comment"}
                  readOnly={!user}
                  required
                ></textarea>
                { commentErrors.map((error, index) => (<p key={index} className="comment-error">{error}</p>)) }
                <div className="comment-form-button-container"><button type="submit">Comment</button></div>
              </form>
              <div className="blog-comment-list">
                {blog.comments.map((comment) => (
                  <div key={comment.id} className="blog-comment-item">
                    <div className="blog-comment-header">
                      <p className="blog-comment-user">{comment.user.username}</p>
                      <p className="blog-comment-date">{getTimeAgo(comment.createdAt)}</p>
                    </div>
                    <div className="blog-comment-content">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
      )}
    </section>
  );
}