import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        if (saved) return JSON.parse(saved); 
        return null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout
    }

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}