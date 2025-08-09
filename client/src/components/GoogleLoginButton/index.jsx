import { createAuthClient } from 'better-auth/react';
import { Button } from '@components';

const authClient = createAuthClient({
    baseURL: 'http://localhost:3000/api/auth'
});

const GoogleLoginButton = () => {

    return (
        <Button
            type='secondary'
            label='Sign in with Google'
            action={ async () => {
                await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "http://localhost:5173/"
                });
            }}
        />
    );

}

export default GoogleLoginButton;
