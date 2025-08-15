import { useContext, useEffect, useState } from "react";
import { performOperationWithTimeout, apiRequest, extractAccountData, TIMEOUTS } from '@utils';
import { useOAuth } from "@hooks";
import { useToast } from "@contexts";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    // ! CRITICAL CRITICAL CRITICAL CRITICAL CRITICAL
    const [ temporaryUser, setTemporaryUser ] = useState(null); // TODO: Continue this. This was made to alleviate the user already logged in before verifying OTP problem.
    const [ isInitializing, setIsInitializing ] = useState(true);
    const [ isUpdatingAvatar, setIsUpdatingAvatar ] = useState(false);
    const [ isRemovingAvatar, setIsRemovingAvatar ] = useState(false);
    const [ userCount, setUserCount ] = useState(0);
    const [ showOTPModal, setShowOTPModal ] = useState(false);
    const { authClient, signOut, getSession, signInThruEmail, signUpThruEmail } = useOAuth();
    const { showToast } = useToast();

    useEffect(() => {
        const initializeAuth = async () => {

            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setIsInitializing(false);
                    return;
                }
                
                const session = await getSession();
                
                if (!session?.user) {
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const delayedSession = await getSession();
                    const user = delayedSession?.user || delayedSession?.data?.user;

                    if (user) {

                        const syncResponse = await apiRequest('/api/oauth/sync', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                oauth_user_id: user.id,
                                email: user.email,
                                name: user.name,
                                image: user.image,
                                email_verified: delayedSession.data.user.email_verified || false
                            })
                        }, TIMEOUTS.OAUTH_EXTERNAL);
                        
                        if (syncResponse.success) {

                            const account = extractAccountData(syncResponse);
                            
                            console.log("Sync data received:", syncResponse);
                            console.log("Sync data account:", account);
                        
                            const unifiedUser = {
                                ...account,
                                id: account.id,
                                auth_provider: 'google',
                                oauth_user: user,
                                role: account.role || 'customer',
                                first_name: account.first_name,
                                last_name: account.last_name,
                                email: account.email,
                                image_url: account.image_url || user.image
                            };

                            if (unifiedUser && !unifiedUser.email_verified) {
                                console.log("SHOULD BE SHOWING OTP MODAL NOW")
                                setShowOTPModal(true);
                            }
                        
                            localStorage.setItem('user', JSON.stringify(unifiedUser));
                            setUser(unifiedUser);
                            setIsInitializing(false);
                            return;

                        } else {
                            console.log("Sync failed with error:", syncResponse);
                        }
                    }
                }

                if (session?.user) {

                    const user = session?.user || session?.data?.user;

                    const syncResponse = await apiRequest('/api/oauth/sync', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            oauth_user_id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            email_verified: delayedSession.data.user.email_verified || false
                        })
                    }, TIMEOUTS.OAUTH_EXTERNAL);

                    if (syncResponse.success) {

                        const account = extractAccountData(syncResponse);
                        
                        console.log("Sync data received:", syncResponse);
                        console.log("Sync data account:", account);
                    
                        const unifiedUser = {
                            ...account,
                            id: account.id,
                            auth_provider: 'google',
                            oauth_user: user,
                            role: account.role || 'customer',
                            first_name: account.first_name,
                            last_name: account.last_name,
                            email: account.email,
                            image_url: account.image_url || user.image
                        };
                        if (unifiedUser && !unifiedUser.email_verified) {
                            console.log("SHOULD BE SHOWING OTP MODAL NOW")
                            setShowOTPModal(true);
                        }
                    
                        localStorage.setItem('user', JSON.stringify(unifiedUser));
                        setUser(unifiedUser);
                        setIsInitializing(false);
                        return;

                    } else {
                        console.log("Sync failed with error:", syncResponse);
                    }
                } else {
                    console.log("No Better Auth session found");
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async ({ email, password }) => { // TODO: Add email verification OTP

        try {

            const result = await performOperationWithTimeout(
                await signInThruEmail({ email: email, password: password }),
                TIMEOUTS.AUTH_EXTERNAL
            );

            if (result.error) {
                console.error("Auth context login function error: ", result.error || result.error.message);
                return;
            }
            
            return result.data;

        } catch (err) {
            console.log("ERRRRRRRRRRRRRRRRRRRRRR")
            console.error('Auth context login function error: ', err);
            return { error: err };
        }

    };

    const create = async(data) => {

        try {

            const result = await performOperationWithTimeout(
                await signUpThruEmail(data),
                TIMEOUTS.AUTH_EXTERNAL
            );

            if (result?.error) {
                const errorData = {
                    code: result?.error?.code,
                    message: result?.error?.message,
                    details: result?.error?.details || "No details provided."
                }
                console.error("Auth context create function Better Auth API error: ", errorData.code, errorData.message, errorData.details);
                return { error: errorData };
            }


            if (result) {
                const user = result.data.user;
                setUser(user);
                showToast(`Account created successfully! Welcome, ${ user.name }!`, 'success');
            }
            return result;
        
        } catch (err) {
            console.error('Auth context create function error: ', err);
            return { error: err.message };
        }

    };

    const logout = async () => {
        try {
            if (user?.auth_provider === 'google' && user?.oauth_user) {
                await signOut();
            }
            
            localStorage.removeItem('user');
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const updatePersonalInfo = async (personalInfo) => {
        
        try {
        
            const data = await apiRequest(`/api/accounts/${user.id}/personal-info`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(personalInfo)
            }, TIMEOUTS.FILE_UPLOAD_API);

            if (data.user) {
                setUser(data.user);
                showToast('Personal information updated successfully!', 'success');
            }
            return data;
        
        } catch (err) {
            console.error('Error updating personal info:', err);
            return { error: err.message };
        }

    };

    const updateAddress = async (address) => {
        if (!user) return { error: 'User not logged in' };

        try {
            setIsInitializing(true);

            const response = await fetch(`/api/accounts/${user.id}/address`, {
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

            const response = await fetch(`/api/accounts/${user.id}/password`, {
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

    const remove = async (id) => {
        
        if (!user) return { error: 'User not logged in' };

        try {

            setIsInitializing(true);

            const response = await fetch(`/api/accounts/${id}`, {
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

            const response = await fetchWithTimeout(`/api/accounts/${user['id']}/avatar`, {
                method: 'POST',
                body: formData
            }, TIMEOUTS.FILE_UPLOAD_API);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data['error'] || 'Failed to upload avatar!');
            }

            const updatedUser = { ...user, image_url: data['image_url'] };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return data;

        } catch (err) {
            console.error("Failed to update avatar:", err);
            return { error: err.message };
        } finally { setIsUpdatingAvatar(false); }

    }

    const removeAvatar = async () => {

        if (!user) return;

        try {

            setIsRemovingAvatar(true);

            const response = await fetch(`/api/accounts/${ user['id'] }/avatar`, {
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
            showOTPModal,
            setShowOTPModal,
            login,
            logout, 
            create, 
            remove,
            updateAvatar,
            removeAvatar,
            updatePersonalInfo,
            updateAddress,
            updatePassword,
        }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);