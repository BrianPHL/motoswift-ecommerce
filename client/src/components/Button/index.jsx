import { Dropdown } from '@components';
import { useEffect, useRef } from 'react';
import { useDropdown } from '@contexts';
import styles from './Button.module.css';

const Button = ({ id, label, type, action, icon, iconPosition, isActive, options, externalStyles, dropdownPosition, ...props }) => {
    
    const dropdownRef = useRef(null);
    const { openDropdownId, setOpenDropdownId, registerDropdown } = useDropdown();
    const hasDropdown = options && options.length > 0;
    const isOpen = openDropdownId === id;
    
    useEffect(() => {
        if (id) registerDropdown(id, dropdownRef.current);
    }, [id, registerDropdown]);

    if (!label && !icon && !type) return null;

    const handleToggle = () => {
        setOpenDropdownId(isOpen ? null : id);
    };
    
    const renderComponent = () => {

        if (hasDropdown && !label && !icon) return (
            <i className={` fa-solid fa-chevron-down ${ isOpen ? styles['chevron-active'] : styles['chevron'] } `}></i>
        );

        if (hasDropdown && label) return (
            <>
                { label }
                <i className={ `fa-solid fa-chevron-down ${ isOpen ? styles['chevron-active'] : styles['chevron'] }` }></i>
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

        if (action && icon) {
            if (type === 'icon' || type === 'icon-outlined') return (
                <i className={ icon }></i>
            );
        };

        return label;

    };
        
    return (
        <>
            { hasDropdown ? (
                <div ref={ dropdownRef } className={ `${ styles['wrapper'] } ${ externalStyles || '' }` }>
                    <button
                        className={ `${ styles[type] } ${ styles['has-dropdown'] } ${ isOpen ? styles['button-active'] : '' }` }
                        onClick={ hasDropdown ? handleToggle : action }
                        type='button'
                        { ...props }
                    >
                        { renderComponent() }
                    </button>
                    <Dropdown
                        options={ options }
                        isOpen={ isOpen }
                        position={ dropdownPosition }
                    />
                </div>
            ) : (
                <button
                    className={ `${ styles[type] } ${ externalStyles || '' }  ${ isActive ? styles['button-active'] : '' }`  }
                    onClick={ hasDropdown ? handleToggle : action }
                    type='button'
                    { ...props }
                >
                    { renderComponent() }
                </button>
            )}
        </>
    );
};

export default Button;
