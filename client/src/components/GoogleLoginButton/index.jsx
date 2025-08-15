import { useOAuth } from '@hooks';
import { Button } from '@components';

const GoogleLoginButton = ({ callbackURL, onSuccess, onError, ...props }) => {

    const { signInThruGoogleSSO } = useOAuth();
    const handleGoogleLogin = async () => {

        try {

            await signInThruGoogleSSO(callbackURL);
 
        } catch (err) {
            console.error("Google sign-in error: ", err);
            onError?.(err.message);
        }

    };

    return (
        <Button
            type='secondary'
            label='Sign in with Google'
            action={ handleGoogleLogin }
            { ...props }
        />
    );

}

GoogleLoginButton.defaultProps = {
    callbackURL: 'http://localhost:5173',
    onSuccess: () => {},
    onError: (error) => console.error('Google sign-in failed: ', error)
};

export default GoogleLoginButton;
