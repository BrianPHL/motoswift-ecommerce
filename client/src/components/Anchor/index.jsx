import { useState } from "react";
import Dropdown from "../Dropdown";
import styles from "./Anchor.module.css";

const Anchor = ({ label, href, dropdownOptions }) => {

    if (!label) return null;

    const [ isOpen, setIsOpen ] = useState(false);
    const hasDropdown = dropdownOptions && dropdownOptions.length > 0;
    const toggleDropdown = () => setIsOpen(!isOpen);
    const renderComponent = () => {
        if (href && !hasDropdown) {
            return(
                <a href={ href } className={ styles.anchor }>
                    { label }
                </a>
            );
        };

        if (!href && hasDropdown) {
            return (
                <div className={ styles.wrapper }>
                    <button
                        className={ `${ styles.anchor } ${ styles.dropdownToggle }` }
                        onClick={ toggleDropdown }
                    >
                        { label }
                        <i className={ `fa-solid fa-chevron-down ${ isOpen ? styles.chevronActive : styles.chevron }` }></i>
                    </button>
                    <Dropdown
                        options={ dropdownOptions } 
                        isOpen={ isOpen }
                    />
                </div>
            );
        };
    };

    return renderComponent();
};

export default Anchor;
