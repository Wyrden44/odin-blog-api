import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const { login } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const res = await loginUser(username, password);

        if (!res.ok) {
            setErrors(errors);
            return;
        }

        console.log("User to.:", res.token);

        // login token
        login({
            username,
            token: res.token,
        });

        navigate("/blogs");
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}