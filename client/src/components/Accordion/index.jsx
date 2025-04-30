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

const Accordion = ({ label, options, children, externalStyles, ...props }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    if (!label) return null;

    return (
        <>
            <button
                className={` ${styles['header']} ${ isOpen ? styles['header-active'] : '' } ${ externalStyles ? externalStyles : null }` }
                onClick={ () => setIsOpen((prev) => !prev) }
                aria-expanded={ isOpen }
                { ...props }
            >
                { label }
                <i className={ `${ 'fa-solid fa-chevron-down' } ${ isOpen ? styles['chevron-active'] : styles['chevron'] }` }></i>
            </button>
            <ul className={ `${ styles['content'] } ${ isOpen ? styles['content-active'] : styles['content-inactive'] }` }>
                {options && options.map((option, index) => (
                    <li key={ index }>
                        <Anchor
                            label={ option.label }
                            link={ option.href }
                            isNested={ true }
                        />
                    </li>
                ))}
                {!options && children && (
                    <li>{children}</li>
                )}
            </ul>
        </>
    );
};

export default Accordion;
