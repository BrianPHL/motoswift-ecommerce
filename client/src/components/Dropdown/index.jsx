import { Button, Anchor } from '@components';
import styles from './Dropdown.module.css';

/**
 * @typedef {import('@components/Anchor').AnchorOption} DropdownOption - Inherits structure from AnchorOption.
 * @property {string} label - The text to display for the option.
 * @property {string} href - The URL the option links to.
 */

/**
 * Renders a dropdown menu, typically controlled by an Anchor component.
 * Displays a list of navigation options using the Anchor component internally.
 * Visibility is controlled by the `isOpen` prop.
 *
 * @component
 * @param {object} props - The component props.
 * @param {DropdownOption[]} props.options - An array of option objects to display in the dropdown. Each option requires `label` and `href`.
 * @param {boolean} props.isOpen - Controls the visibility and animation state of the dropdown.
 * @returns {JSX.Element | null} The rendered dropdown list element, or null if `options` are missing or empty.
 *
 * @example (Used internally by Anchor)
 * <Dropdown
 *   options={[
 *     { label: "Brand #1", href: "#" },
 *     { label: "Brand #2", href: "#" },
 *   ]}
 *   isOpen={isDropdownOpen}
 * />
 */

const Dropdown = ({ options, isOpen }) => {

    if (!options || options.length === 0) return null;

    return (
        <ul className={ `${ styles['dropdown'] } ${ isOpen ? styles['dropdown-active'] : styles['dropdown-inactive'] }` }>
            { options.map((option, index) => (
                <li key={ index }>
                    { option.href ? (
                        <Anchor
                            label={ option.label }
                            href={ option.href }
                            isNested={ true }
                        />
                    ) : (
                        <Button
                            label={ option.label }
                            action={ option.action }
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
