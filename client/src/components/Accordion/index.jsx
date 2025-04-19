import { useState } from 'react';
import { Anchor } from '@components';
import styles from './Accordion.module.css';

const Accordion = ({ label, options }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    if (!label || !options) return null;

    return (
        <>
            <button
                className={` ${styles['header']} ${ isOpen ? styles['header-active'] : '' }` }
                onClick={ () => setIsOpen((prev) => !prev) }
                aria-expanded={ isOpen }
            >
                { label }
                <i className={ `${ 'fa-solid fa-chevron-down' } ${ isOpen ? styles['chevron-active'] : styles['chevron'] }` }></i>
            </button>
            <ul className={ `${ styles['content'] } ${ isOpen ? styles['content-active'] : styles['content-inactive'] }` }>
                { options.map((option, index) => (
                    <li key={ index }>
                        <Anchor
                            label={ option.label }
                            href={ option.href }
                            isNested={ true }
                        />
                    </li>
                ))} 
            </ul>
        </>
    );
};

export default Accordion;
