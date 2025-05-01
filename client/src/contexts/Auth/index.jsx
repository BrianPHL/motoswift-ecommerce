import { useContext, useState } from "react";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = async ({ email, password }) => {
        try {
            const response = await fetch('/api/accounts/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);