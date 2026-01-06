export default function Login() {
    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}