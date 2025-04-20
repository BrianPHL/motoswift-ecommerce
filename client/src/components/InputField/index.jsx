import { Button } from '@components';
import styles from './InputField.module.css';

const InputField = ({ hint, icon }) => {

    if (!hint) return null;

    return (
        <div className={ styles['wrapper'] }>
            <input className={ icon ? styles['input-icon'] : styles['input'] } type="text" placeholder={ hint }/>
            { icon ? (
                <Button
                    type='icon'
                    icon={ icon }
                    action={ () => {} }
                    isOutlined={ true }
                />
            ) : (
                <Button
                    label="Submit"
                    type="primary"
                    action={ () => {} }
                />
            )}
        </div>
    );
};

export default InputField;