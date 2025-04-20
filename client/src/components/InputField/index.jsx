import { Button } from '@components';
import styles from './InputField.module.css';

const InputField = ({ hint, icon }) => {
    console.log(hint)

    if (!hint) return null;

    return (
        <div className={ styles['wrapper'] }>
            <input className={ icon ? styles['input-icon'] : styles['input'] } type="text" placeholder={ hint }/>
            { icon ? (
                <Button
                    type='icon'
                    icon={ icon }
                    action={ () => { console.log("test") } }
                    isOutlined={ true }
                />
            ) : (
                <Button
                    label="Submit"
                    type="primary"
                    action={ () => console.log("Submit") }
                />
            )}
        </div>
    );
};

export default InputField;