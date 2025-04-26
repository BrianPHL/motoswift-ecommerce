import { useNavigate } from 'react-router';
import { Anchor, Button, InputField } from '@components';
import styles from './SignIn.module.css';

const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['header'] }>
                <Button
                    icon='fa-solid fa-angle-left'
                    type='secondary'
                    label='Go back'
                    iconPosition='left'
                    action={ () => { navigate(-1) } }
                />
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
                    </div>
                    <div className={ styles['ctas-container'] }>
                        <Button
                            type='primary'
                            label='Sign in'
                            action={ () => {} }
                        />
                        <p>Don't have an account yet? <Anchor label="Sign up" href="/sign-up" isNested={ false }/></p>
                    </div>
                </form>
                <div className={ styles['banner'] }></div>
            </div>
        </div>
    );
};

export default SignIn;
