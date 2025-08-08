import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createAuthClient } from "better-auth/client";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isInitializing, setIsInitializing ] = useState(true);
    const [ isUpdatingAvatar, setIsUpdatingAvatar ] = useState(false);
    const [ isRemovingAvatar, setIsRemovingAvatar ] = useState(false);
    const [ userCount, setUserCount ] = useState(0);
    const authClient = createAuthClient({ baseUrl: "http://localhost:5173/auth" });
    const navigate = useNavigate();

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
                setIsInitializing(false);
            }
        };

        loadUserFromStorage();
    }, []);

    const signInWithGoogle = async () => {
        try {
            await authClient.signIn.social({ provider: "google" });
        } catch (err) {
          console.error("Google sign-in failed", err);
        }
    };

    const handleCallback = async () => {
        try {
            const session = await authClient.handleCallback();
            localStorage.setItem("token", session.token);
            navigate('/')
        } catch (err) {
            console.error("Callback handling failed: ", err);
            navigate("/login");
        }
    };

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

    const updatePersonalInfo = async (personalInfo) => {

        if (!user) return { error: 'User not logged in' };

        try {
            setIsInitializing(true);

            const response = await fetch(`/api/accounts/${user.account_id}/personal-info`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(personalInfo)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update personal information');
            }

            const updatedUser = { ...data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true };
        } catch (err) {
            console.error("Failed to update personal info:", err);
            return { error: err.message };
        } finally {
            setIsInitializing(false);
        }
    };

    const updateAddress = async (address) => {
        if (!user) return { error: 'User not logged in' };

        try {
            setIsInitializing(true);

            const response = await fetch(`/api/accounts/${user.account_id}/address`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update address');
            }

            const updatedUser = { ...data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true };
        } catch (err) {
            console.error("Failed to update address:", err);
            return { error: err.message };
        } finally {
            setIsInitializing(false);
        }
    };

    const updatePassword = async (password) => {

        if (!user) return { error: 'User not logged in' };

        try {
            setIsInitializing(true);

            const response = await fetch(`/api/accounts/${user.account_id}/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update password');
            }

            return { success: true };
        } catch (err) {
            console.error("Failed to update password:", err);
            return { error: err.message };
        } finally {
            setIsInitializing(false);
        }
    };

    const remove = async (account_id) => {
        
        if (!user) return { error: 'User not logged in' };

        try {

            setIsInitializing(true);

            const response = await fetch(`/api/accounts/${account_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete account');
            }

            logout();

            return { success: true };
        } catch (err) {
            console.error("Failed to delete account:", err);
            return { error: err.message };
        } finally { setIsInitializing(false); }

    };

    const updateAvatar = async (file) => {

        if (!user || !file) return { error: 'Missing user or file!' };

        try {

            setIsUpdatingAvatar(true);

            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(`/api/accounts/${ user['account_id'] }/avatar`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data['error'] || 'Failed to upload avatar!');
            }

            const updatedUser = { ...user, image_url: data['image_url'] };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true, image_url: data['image_url'] };

        } catch (err) {
            console.error("Failed to update avatar:", err);
            return { error: err.message };
        } finally { setIsUpdatingAvatar(false); }

    }

    const removeAvatar = async () => {

        if (!user) return;

        try {

            setIsRemovingAvatar(true);

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
        } finally { setIsRemovingAvatar(false); }

    };

    const fetchUserCount = async () => {

        if (!user) return;
        
        try {
            const response = await fetch('/api/accounts/count');
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch user count');
            }
            
            setUserCount(data.count);
            return data.count;
        } catch (error) {
            console.error('Error fetching user count:', error);
            return 0;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            userCount,
            fetchUserCount,
            isLoading: isInitializing, 
            isUpdatingAvatar,
            isRemovingAvatar,
            login, 
            logout, 
            create, 
            remove,
            updateAvatar,
            removeAvatar,
            updatePersonalInfo,
            updateAddress,
            updatePassword,
            signInWithGoogle,
            handleCallback
        }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);