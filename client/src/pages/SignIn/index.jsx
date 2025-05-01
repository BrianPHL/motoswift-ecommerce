import { useState } from 'react';
import { Anchor, Button, InputField, ReturnButton } from '@components';
import styles from './SignIn.module.css';
import { useAuth } from '@contexts';
import { useNavigate } from 'react-router';

const SignIn = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    const handleSignIn = async () => {
        const success = await login({ email, password });
        if (!success) {
        } else {
            setError('');
            navigate('/');
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
                    <div className={ styles['inputs-container'] }>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="email_address">
                                Email address
                            </label>
                            <InputField
                                hint='Your email address...'
                                type='email'
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
                <div className={ styles['banner'] }></div>
            </div>
        </div>
    );
};

export default SignIn;
