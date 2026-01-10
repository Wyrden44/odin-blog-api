import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
    const {isAuthenticated} = useAuth();

    return (
        <nav>
            <div className="logo">
                <h1>MyBlog</h1>
            </div>

            <ul className="links">
                <li>
                    <NavLink className="nav-link" to="/admin/blogs">Blogs</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to={isAuthenticated ? "/admin/logout" : "/admin/login"}>{isAuthenticated ? "Logout" : "Login"}</NavLink>
                </li>
            </ul>
        </nav>
    )
}