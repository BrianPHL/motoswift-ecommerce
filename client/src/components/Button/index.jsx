import { useState } from 'react';
import styles from './Button.module.css';

const Button = ({ label, type, action, icon, isOutlined, iconPosition, dropdownOptions }) => {

    const [ isOpen, setIsOpen ] = useState(false);
    
    if (!label && !icon && !type) return null;

    const hasDropdown = dropdownOptions && dropdownOptions.length > 0;
    const toggleDropdown = () => setIsOpen(!isOpen);
    const renderComponent = () => {
        if (hasDropdown) return (
            <>
                { label }
                <i className='fa-solid fa-chevron-down'></i>
            </>
        );

        if (action && type !== 'icon' && icon && iconPosition) {
            return iconPosition === 'left' ? (
                <>
                    <i className={`${icon}`}></i>
                    {label}
                </>
            ) : (
                <>
                    {label}
                    <i className={`${icon}`}></i>
                </>
            );
        };

        if (action && type === 'icon' && icon && isOutlined !== undefined) return (
            <i className={ `${ icon } ${ isOutlined ? styles['icon-outlined'] : '' }` }></i>
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
