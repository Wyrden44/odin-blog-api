import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Nav.css";

export default function Nav() {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <div className="logo">MyBlog</div>

      <ul className="links">
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end={false}
          >
            Blogs
          </NavLink>
        </li>

        <li>
          {isAuthenticated ? (
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          )}
        </li>

        {!isAuthenticated && (
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sign Up
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
