import { Button } from '@components';
import styles from './InputField.module.css';

/**
 * Renders an input field, optionally paired with an adjacent button.
 * The button displayed depends on the presence of the `icon` prop.
 * If `icon` is provided, an icon button is shown; otherwise, a default "Submit" button is shown.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.hint - The placeholder text for the input field.
 * @param {string} [props.icon] - If provided, displays an icon Button (using the value as the Font Awesome class) instead of the default "Submit" Button.
 * @returns {JSX.Element | null} The rendered input field with its corresponding button, or null if `hint` is not provided.
 *
 * @example Input with default "Submit" Button
 * <InputField hint="Enter your email" />
 *
 * @example Input with Icon Button (e.g., for Newsletter)
 * <InputField hint="Your email address..." icon="fa-solid fa-paper-plane" />
 */

const InputField = ({ hint, icon, isSubmittable, ...props }) => {

    if (!hint || isSubmittable === undefined) return null;

    if (!icon && !isSubmittable) {
        return (
            <input
                className={ styles['input-unnested'] }
                placeholder={ hint }
                { ...props }
            />
        );
    };

    if (icon && !isSubmittable) {
        return (
            <div className={ styles['wrapper'] }>
                <input
                    className={ styles['input-icon'] }
                    placeholder={ hint }
                    { ...props }
                />
                <Button
                    type='icon'
                    icon={ icon }
                    action={ () => {} }
                    isOutlined={ true }
                />
            </div>
        );
    };

    return (
        <div className={ styles['wrapper'] }>
            <input
                className={ styles['input-icon'] }
                placeholder={ hint }
                { ...props }
            />
            <Button
                label='Search'
                type='primary'
                action={ () => {} }
            />
        </div>
    );

};

export default InputField;