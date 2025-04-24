import { Dropdown } from '@components';
import { useEffect, useRef } from 'react';
import { useDropdown } from '@contexts';
import styles from './Button.module.css';

/**
 * Renders a button with various styles and functionalities.
 * Can be a standard text button, an icon button, or potentially a dropdown trigger (logic exists but seems incomplete).
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} [props.label] - The text label displayed on the button. Required for 'primary' and 'secondary' types unless an icon is also provided.
 * @param {'primary' | 'secondary' | 'icon'} props.type - The visual style and type of the button.
 * @param {function} [props.action] - The function to execute when the button is clicked. Not used if `options` are provided.
 * @param {string} [props.icon] - A Font Awesome icon class string (e.g., 'fa-solid fa-plus'). Used for 'icon' type or alongside labels.
 * @param {boolean} [props.isOutlined] - If true, applies an outlined style. Primarily used visually with `type='icon'` based on CSS ([`Button.module.css`](client/src/components/Button/Button.module.css)).
 * @param {'left' | 'right'} [props.iconPosition] - If both `label` and `icon` are provided (and not `type='icon'`), specifies the icon's position relative to the label.
 * @param {Array<object>} [props.options] - If provided, turns the button into a dropdown toggle (implementation seems incomplete/missing Dropdown component usage).
 * @returns {JSX.Element | null} The rendered button element, or null if essential props like `type` are missing.
 *
 * @example Primary Button
 * <Button label="Submit" type="primary" action={() => console.log('Submit')} />
 *
 * @example Secondary Button
 * <Button label="Sign in" type="secondary" action={() => navigate('/sign-in')} />
 *
 * @example Icon Button (Not Outlined)
 * <Button type="icon" action={toggleTheme} icon="fa-solid fa-moon" isOutlined={false} />
 *
 * @example Icon Button (Outlined) - Used for Social Icons in Footer
 * <Button type='icon' icon='fa-brands fa-facebook' action={() => {}} isOutlined={true} />
 *
 * @example Button with Icon and Label (Conceptual - based on render logic)
 * <Button label="Add" type="primary" action={() => {}} icon="fa-solid fa-plus" iconPosition="left" />
 */

let globalOpenDropdown = null;

const Button = ({ id, label, type, action, icon, isOutlined, iconPosition, options }) => {
    
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

        if (hasDropdown) return (
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

        if (action && type === 'icon' && icon && isOutlined !== undefined) return (
            <i className={ `${ icon } ${ isOutlined ? styles['icon-outlined'] : '' }` }></i>
        );

        return label;

    };
        
    return (
        <>
            { hasDropdown ? (
                <div className={ styles['wrapper'] }>
                    <button
                        className={ `${ styles[type] } ${ styles['has-dropdown'] }` }
                        onClick={ hasDropdown ? handleToggle : action }
                        onMouseDown={ event => event.stopPropagation() }
                    >
                        { renderComponent() }
                    </button>
                    <Dropdown
                        options={ options }
                        isOpen={ isOpen }
                    />
                </div>
            ) : (
                <button
                    className={ styles[type]  }
                    onClick={ hasDropdown ? handleToggle : action }
                >
                    { renderComponent() }
                </button>
            )}
        </>
    );
};

export default Button;
