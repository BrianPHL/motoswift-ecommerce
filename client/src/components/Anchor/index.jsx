import { Dropdown } from '@components';
import { useEffect, useRef } from 'react';
import { useDropdown } from '@contexts';
import styles from "./Anchor.module.css";

/**
 * @typedef {object} AnchorOption
 * @property {string} label - The text to display for the option.
 * @property {string} href - The URL the option links to.
 */

/**
 * Renders either a standard HTML anchor tag (`<a>`) or a button that toggles a Dropdown menu.
 * It manages the state for its own dropdown and ensures only one dropdown (associated with an Anchor) is open globally at a time.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} [props.id] - A unique identifier, required if the anchor has dropdown options, used for global state management.
 * @param {string} props.label - The text label for the anchor or dropdown toggle button.
 * @param {string} [props.href] - The URL for the link. Required if `options` is not provided. If provided with `options`, it's ignored.
 * @param {boolean} props.isNested - Determines the styling. `true` for anchors inside Dropdowns or Accordions, `false` for top-level anchors (e.g., in Header nav).
 * @param {AnchorOption[]} [props.options] - An array of options to display in a dropdown menu. If provided, `href` is ignored, and the component renders a button toggle.
 * @returns {JSX.Element | null} The rendered anchor link or dropdown toggle, or null if required props (`label`, `isNested`) are missing.
 *
 * @example Simple Link
 * <Anchor label="About us" href="/about-us" isNested={false} />
 *
 * @example Nested Link (e.g., inside Dropdown)
 * <Anchor label="Brand #1" href="#" isNested={true} />
 *
 * @example Dropdown Toggle
 * <Anchor
 *   id="motorcycleDropdown"
 *   label="Motorcycles"
 *   isNested={false}
 *   options={[
 *     { label: "Brand #1", href: "#" },
 *     { label: "Brand #2", href: "#" },
 *   ]}
 * />
*/

const Anchor = ({ id, label, href, isNested, isActive, options }) => {

    const dropdownRef = useRef(null);
    const { openDropdownId, setOpenDropdownId, registerDropdown } = useDropdown();
    const hasDropdown = options && options.length > 0;
    const isOpen = openDropdownId === id;
    
    useEffect(() => {
        if (id) registerDropdown(id, dropdownRef.current);
    }, [id, registerDropdown]);

    if (!label || isNested === undefined) return null;

    const handleToggle = () => {
        setOpenDropdownId(isOpen ? null : id);
    };

    const renderComponent = () => {
        if (href && !hasDropdown) {
            return(
                <a href={ href } className={ `${ isNested ? styles['anchor-nested'] : styles['anchor'] } ${ isActive ? styles['anchor-active'] : '' }` }>
                    { label }
                </a>
            );
        };

        if (!href && hasDropdown) {
            return (
                <div ref={ dropdownRef } className={ styles['wrapper'] }>
                    <button
                        className={ `${ styles['anchor'] } ${ styles['dropdown-toggle'] } ${ isOpen ? styles['dropdown-active'] : '' }` }
                        onClick={ handleToggle }
                        onMouseDown={ event => event.stopPropagation() }
                    >
                        { label }
                        <i className={ `fa-solid fa-chevron-down ${ isOpen ? styles['chevron-active'] : styles['chevron'] }` }></i>
                    </button>
                    <Dropdown
                        options={ options } 
                        isOpen={ isOpen }
                    />
                </div>
            );
        };
    };

    return renderComponent();
};

export default Anchor;
