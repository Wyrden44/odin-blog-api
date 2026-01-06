import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
    const {user, isAuthenticated} = useAuth();

    return (
        <nav>
            <div className="logo">
                Blogs
            </div>
            <ul className="links">
                <li>
                    <Link to="/blogs">Blogs</Link>
                </li>
                <li>
                    { (isAuthenticated) ? (<Link to="logout">Logout</Link>) : (<Link to="/login">Login</Link>)}
                </li>
                { !isAuthenticated && 
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                }
            </ul>
        </nav>
    );
}