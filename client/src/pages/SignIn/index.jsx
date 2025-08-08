import { useState } from 'react';
import { Anchor, Button, InputField, ReturnButton, GoogleLoginButton } from '@components';
import styles from './SignIn.module.css';
import { useAuth, useToast } from '@contexts';
import { useNavigate } from 'react-router';

const SignIn = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formError, setFormError ] = useState('');
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    const handleSignIn = async () => {

        try {
            const result = await login({ email, password });

            if (result?.error) {
                setFormError(result['error']);
                return;
            } else {
                setFormError('');
                showToast(`Welcome! You\'ve successfully logged in as ${ result['user']['email'] }.`, 'success')
                navigate('/');
            }
        } catch (err) {
            setFormError('Server error. Please try again. ' + err)
        }

    };
    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['header'] }>
                <ReturnButton />
                <h1>Sign into your account</h1>
            </div>
            <div className={ styles['container'] }>
                <form className={ styles['form'] }>
                    { formError &&
                        <div className={ styles['error'] }>
                            <i className='fa-solid fa-circle-exclamation'></i>
                            <p>{ formError }</p>
                        </div>
                    }
                    <div className={ styles['inputs-container'] }>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="email_address">
                                Email address
                            </label>
                            <InputField
                                hint='Your email address...'
                                type='text'
                                value={ email }
                                onChange={e => setEmail(e.target.value)}
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="password">
                                Password
                            </label>
                            <InputField
                                value={ password }
                                onChange={e => setPassword(e.target.value)}
                                hint='Your password...'
                                type={ showPassword ? 'text' : 'password' }
                                icon={ showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash' }
                                action={ () => { handlePasswordToggle() } }
                                isSubmittable={ false }
                            />
                        </div>
                    </div>
                    <div className={ styles['ctas-container'] }>
                        <Button
                            type='primary'
                            label='Sign in'
                            action={ handleSignIn }
                            disabled={ !email || !password }
                        />
                        <p>Don't have an account yet? <Anchor label="Sign up" link="/sign-up" isNested={ false }/></p>
                    </div>
                </form>
                <GoogleLoginButton></GoogleLoginButton>
                <div className={ styles['banner'] }></div>
            </div>
        </div>
    );
};

export default SignIn;
