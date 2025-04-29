import { Button } from '@components';
import styles from './InputField.module.css';

/**
 * InputField component.
 * Renders an input with three possible variants:
 * 1. Input only (no button) if neither `icon` nor `isSubmittable` is provided.
 * 2. Input with an icon button if `icon` is provided and `isSubmittable` is false.
 * 3. Input with a submit button if `isSubmittable` is true.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.hint - Placeholder text for the input.
 * @param {string} [props.icon] - Font Awesome icon class for the icon button.
 * @param {boolean} [props.isSubmittable] - If true, shows a submit button.
 * @returns {JSX.Element|null} The rendered input field and optional button, or null if `hint` is not provided.
 *
 * @example
 * // Input only
 * <InputField hint="Enter your email" />
 *
 * @example
 * // Input with icon button
 * <InputField hint="Your email..." icon="fa-solid fa-paper-plane" />
 *
 * @example
 * // Input with submit button
 * <InputField hint="Search..." isSubmittable={true} />
 */

const InputField = ({ hint, icon, action, isSubmittable, ...props }) => {

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
                    action={ action }
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
                action={ action }
            />
        </div>
    );

};

export default InputField;