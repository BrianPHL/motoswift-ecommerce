import { useState } from 'react';
import { Anchor, Button, InputField, ReturnButton, Modal } from '@components';
import styles from './SignIn.module.css';
import { useAuth } from '@contexts';

const SignIn = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ modalOpen, setModalOpen ] = useState(false);
    const { login } = useAuth();
    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    const handleSignIn = () => {
        const success = login({ email, password });
        if (!success) {
            setError('Invalid email or password.');
            setModalOpen(true);
        } else {
            setError('');
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
                        />
                        <p>Don't have an account yet? <Anchor label="Sign up" link="/sign-up" isNested={ false }/></p>
                    </div>
                </form>
                <div className={ styles['banner'] }></div>
            </div>
            <Modal
                open={ modalOpen }
                message={error}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default SignIn;
