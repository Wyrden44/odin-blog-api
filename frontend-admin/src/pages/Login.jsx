import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginAdmin } from "../api/auth";

export default function Login() {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const {login} = useAuth();

    async function onSubmit(e) {
        e.preventDefault();

        const res = await loginAdmin(password);
    
        if (!res.ok) {
            setErrors(res.errors ? res.errors : ["An unexpected server error occurred"]);
            return;
        }

        login({
            username: "admin",
            token: res.token,
        });

        navigate("/admin/blogs");
    }

    return (
        <section className="login-page">
            <h1>Admin Log In</h1>
            <form onSubmit={onSubmit} className="login">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" required />
                <div className="errors">
                    { errors.map(error => <p>{error}</p>) }
                </div>
                <button type="submit">Log In</button>
            </form>
        </section>
    )
}