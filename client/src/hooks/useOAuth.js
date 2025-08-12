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
    };

};

export default useOAuth;
