import { useNavigate } from 'react-router';
import { Anchor, Button, InputField, ReturnButton } from '@components';
import styles from './SignUp.module.css';

const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['header'] }>
                <ReturnButton />
                <h1>Create your account</h1>
            </div>
            <div className={ styles['container'] }>
                <form className={ styles['form'] }>
                    <div className={ styles['inputs-container'] }>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="name">
                                Name
                            </label>
                            <InputField
                                hint='Your name...'
                                type='text'
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="email_address">
                                Email address
                            </label>
                            <InputField
                                hint='Your email address...'
                                type='email'
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="password">
                                Password
                            </label>
                            <InputField
                                hint='Your password...'
                                type='password'
                                icon='fa-solid fa-eye-slash'
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="confirm_password">
                                Confirm password
                            </label>
                            <InputField
                                hint='Confirm your password...'
                                type='password'
                                icon='fa-solid fa-eye-slash'
                                isSubmittable={ false }
                            />
                        </div>
                    </div>
                    <div className={ styles['ctas-container'] }>
                        <Button
                            type='primary'
                            label='Sign up'
                            action={ () => {} }
                        />
                        <p>Already have an account? <Anchor label="Sign in" href="/sign-in" isNested={ false }/></p>
                    </div>
                </form>
                <div className={ styles['banner'] }></div>
            </div>
        </div>
    );
};

export default SignIn;
