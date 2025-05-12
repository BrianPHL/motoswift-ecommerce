import { useContext, useEffect, useState } from "react";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                }
            } catch (err) {
                console.error('Failed to load user from storage:', err);
                
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        loadUserFromStorage();
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

    const removeAvatar = async () => {

        if (!user) return;

        try {

            setLoading(true);

            const response = await fetch(`/api/accounts/${ user['account_id'] }/avatar`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data['error'] || 'Failed to remove avatar');
            }

            const updatedUser = { ...user };
            delete updatedUser['image_url'];

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true };

        } catch (err) {
            console.error("Failed to remove avatar:", err);
            return { error: err.message };
        } finally { setLoading(false); }

    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, create }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);