import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
    baseURL: 'http://localhost:3000/api/auth',
    fetchOptions: {
        credentials: 'include'
    },
    plugins: [
        emailOTPClient()
    ]
});

const useOAuth = () => {

    return {
        authClient,
        signInThruGoogleSSO: (callbackURL = 'http://localhost:5173/') => {
            
            const result = authClient.signIn.social({
                provider: 'google',
                callbackURL
            });
            
            return result;
        },
        signInThruEmail: async (data, callbackURL = 'http://localhost:5173/') => {

            console.log("signInThruEmail DATA: ", data);

            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: false,
                callbackURL: callbackURL
            });

            return result;

        },
        signUpThruEmail: (data, callbackURL = 'http://localhost:5173/') => {

            const result = authClient.signUp.email({
                email: data.email,
                name: `${ data.firstName } ${ data.lastName }`,
                first_name: data.firstName,
                last_name: data.lastName,
                contact_number: data.contactNumber,
                address: data.address,
                password: data.password,
                callbackURL: callbackURL
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
