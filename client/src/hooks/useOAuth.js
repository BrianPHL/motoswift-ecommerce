import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
    baseURL: 'http://localhost:3000/api/auth',
    fetchOptions: {
        credentials: 'include'
    }
});

const useOAuth = () => {

    return {
        authClient,
        signInWithGoogle: (callbackURL = 'http://localhost:5173/') => {
            
            const result = authClient.signIn.social({
                provider: 'google',
                callbackURL
            });
            
            return result;
        },
        signOut: () => authClient.signOut(),
        getSession: () => authClient.getSession(),
        sendVerificationEmail: async () => {
            return await fetch('/api/oauth/send-verification-email', {
                method: 'POST',
                credentials: 'include'
            });
        },
        
        resendVerificationEmail: async (email) => {
            return await fetch('/api/oauth/send-verification-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
                credentials: 'include'
            });
        }
    };

};

export default useOAuth;
