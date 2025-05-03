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

            if (response['ok']) {
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                return { user: data };
            } else {
                return { error: data['error'] };
            }
        } catch (err) {
            console.error('/login route error: ', err);
            return { error: 'Server error. Please try again. ' + err };
        }
    };

    const create = async({ firstName, lastName, email, address, contactNumber, password }) => {
        try {
            const response = await fetch('/api/accounts/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, address, contactNumber, password })
            });
            const data = await response.json();

            if (response['ok']) {
                return null;
            } else {
                return { error: data['error'] };
            }
        } catch (err) {
            console.error('/create route error: ', err);
            return { error: 'Server error. Please try again. ' + err };
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, create }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);