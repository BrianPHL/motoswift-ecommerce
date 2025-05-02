import { useContext, useEffect, useState } from "react";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = async ({ email, password }) => {
        try {
            const response = await fetch('/api/accounts/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('/login route error: ', err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);