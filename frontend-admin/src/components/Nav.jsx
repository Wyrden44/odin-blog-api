import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
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
                    <NavLink className="nav-link" to={"/admin/login"}>{"Login"}</NavLink>
                </li>
            </ul>
        </nav>
    )
}