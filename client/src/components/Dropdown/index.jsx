import { Anchor } from '@components';
import styles from './Dropdown.module.css';

const Dropdown = ({ options, isOpen }) => {

    if (!options || options.length === 0) return null;

    return (
        <ul className={ `${ styles.dropdown } ${ isOpen ? styles.dropdownActive : styles.dropdownInactive }` }>
            { options.map((option, index) => (
                <li key={ index }>
                    <Anchor
                        label={ option.label }
                        href={ option.href }
                        isNested={ true }
                    ></Anchor>    
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
