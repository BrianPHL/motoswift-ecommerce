import { useState } from 'react';
import styles from './Button.module.css';

const Button = ({ label, type, action, icon, iconPosition, dropdownOptions }) => {

    const [ isOpen, setIsOpen ] = useState(false);
    
    if (!label && !icon && !type) return null;

    const hasDropdown = dropdownOptions && dropdownOptions.length > 0;
    const toggleDropdown = () => setIsOpen(!isOpen);
    const renderComponent = () => {
        if (hasDropdown) return (
            <>
                <button className={ styles[type] }>
                    { label }
                    <i className='fa-solid fa-chevron-down'></i>
                </button>  
            </>
        );

        if (icon && iconPosition) return (
            <>
               iconPosition === 'left' ? (
                    <i className={ `${ icon }` }></i>
                    { label }
                ) : iconPosition === 'right' ? (
                    { label }
                    <i className={ `${ icon }` }></i>
                );
            </>
        );

        return label;

    };
        
    return (
        <button
            className={ styles[type] }
            onClick={ hasDropdown ? toggleDropdown : action }
        >
            { renderComponent() }
        </button>
    );
};

export default Button;
