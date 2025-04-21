import styles from './Logo.module.css';
import { useNavigate } from 'react-router';

/**
 * Renders the MotoSwift site logo consisting of "MOTO" and "SWIFT" parts.
 * Clicking the logo navigates the user to the homepage ('/').
 * Variations are primarily stylistic and handled via CSS.
 *
 * @component
 * @returns {JSX.Element} The rendered logo component.
 *
 * @example
 * <Logo />
 */

const Logo = () => {

    const navigate = useNavigate();

    return (
        <div className={ styles['logo'] } onClick={ () =>  navigate('/') }>
            <h1 className={ styles['left'] }>MOTO</h1>
            <h2 className={ styles['right'] }>SWIFT</h2>
        </div>
    );
};

export default Logo;
