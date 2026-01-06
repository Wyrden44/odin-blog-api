import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../api/auth";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const res = await signupUser(username, password);

        if (!res.ok) {
            setErrors(errors);
            return;
        }

        console.log("User id:", res.id);
        navigate("/login");
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type="submit">Submit</button>
            </form>
            <ul className="errors">
                {errors.forEach(error => {
                    <li>{error}</li>
                })}
            </ul>
        </div>
    );
}