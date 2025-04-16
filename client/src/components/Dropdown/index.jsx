import styles from './Dropdown.module.css';
import Anchor from '../Anchor';

const Dropdown = ({ options, isOpen }) => {

    if (!options || options.length === 0) return null;

    return (
        <ul className={ `${ styles.dropdown } ${ isOpen ? styles.dropdownActive : styles.dropdownInactive }` }>
            { options.map((option, index) => (
                <li key={ index } className={ styles.item }>
                    <Anchor
                        label={ option.label }
                        href={ option.href }
                    ></Anchor>       
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
