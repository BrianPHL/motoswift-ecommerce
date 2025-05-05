import { useState } from 'react';
import { Anchor } from '@components';
import styles from './Accordion.module.css';

/**
 * @typedef {object} AccordionOption
 * @property {string} label - The text to display for the accordion item link.
 * @property {string} href - The URL the item links to.
 */

/**
 * Renders a collapsible accordion item.
 * Displays a header (label) that can be clicked to toggle the visibility of a content area.
 * The content area contains a list of links rendered using the Anchor component.
 * Used in the mobile navigation drawer.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.label - The text label displayed on the accordion header button.
 * @param {AccordionOption[]} props.options - An array of options to display as links within the collapsible content area. Each option needs `label` and `href`.
 * @returns {JSX.Element | null} The rendered accordion item (header and content), or null if `label` or `options` are missing.
 *
 * @example
 * <Accordion
 *   label="Motorcycles"
 *   options={[
 *     { label: "Brand #1", href: "/" },
 *     { label: "Brand #2", href: "/" },
 *   ]}
 * />
 */

const Accordion = ({ label, options, externalStyles, onLinkClick, children, isOpenByDefault = false, ...props }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    if (!label) return null;

    return (
        <div className={ `${ styles['wrapper'] } ${ externalStyles ? externalStyles : null } `}>
            <button
                className={` ${styles['header']} ${ isOpen || isOpenByDefault ? styles['header-active'] : '' }` }
                onClick={ () => setIsOpen((prev) => !prev) }
                aria-expanded={ isOpen || isOpenByDefault }
                { ...props }
            >
                { label }
                <i className={ `${ 'fa-solid fa-chevron-down' } ${ isOpen || isOpenByDefault ? styles['chevron-active'] : styles['chevron'] }` }></i>
            </button>
            <ul className={ `${ styles['content'] } ${ isOpen || isOpenByDefault ? styles['content-active'] : styles['content-inactive'] }` }>
                { options && options.map((option, index) => (
                    <li key={ index }>
                        <Anchor
                            label={ option.label }
                            link={ option.link }
                            isNested={ true }
                            onClick={ onLinkClick }
                        />
                    </li>
                ))}
                {!options && children && (
                    <li>{children}</li>
                )}
            </ul>
        </div>
    );
};

export default Accordion;
