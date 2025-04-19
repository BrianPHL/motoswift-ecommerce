import { useState } from "react";
import { Dropdown } from "@components";
import styles from "./Anchor.module.css";

let globalOpenDropdown = null;

const Anchor = ({ id, label, href, isNested, options }) => {

    const [ isOpen, setIsOpen ] = useState(false);
    
    if (!label || isNested === undefined) return null;

    const hasDropdown = options && options.length > 0;
    const handleToggle = () => {
        if (globalOpenDropdown?.id !== id) {
            globalOpenDropdown?.setIsOpen(false);
            globalOpenDropdown = { id, setIsOpen };
            setIsOpen(true);
        } else {
            globalOpenDropdown = null;
            setIsOpen(false);
        };
    };
    const renderComponent = () => {
        if (href && !hasDropdown) {
            return(
                <a href={ href } className={ isNested ? styles['anchor-nested'] : styles['anchor'] }>
                    { label }
                </a>
            );
        };

        if (!href && hasDropdown) {
            return (
                <div className={ styles['wrapper'] }>
                    <button
                        className={ `${ styles['anchor'] } ${ styles['dropdown-toggle'] }` }
                        onClick={ handleToggle }
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
