import { useState } from 'react';
import styles from './Modal.module.css';
import { Button } from '@components';

const Modal = ({
    open,
    message,
    onClose,
    isInput = false,
    onSubmit,
    inputLabel = "Preferred Reservation Date"
}) => {
    const [inputValue, setInputValue] = useState('');

    if (!open) return null;

    const handleSubmit = () => {
        if (onSubmit) onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    return (
        <div className={ styles['modal'] } onClick={onClose}>
            <div className={styles['box'] } onClick={e => e.stopPropagation()}>
                <p>{message}</p>
                {isInput && (
                    <div className={ styles['input'] }>
                        <label htmlFor="modal-input">{inputLabel}</label>
                        <input
                            id="modal-input"
                            type="date"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <Button
                            type='primary'
                            label='Submit'
                            action={handleSubmit}
                            disabled={!inputValue}
                        />
                    </div>
                )}
                <Button
                    type='secondary'
                    label='Close'
                    action={ () => { setInputValue(''); onClose(); } }
                />
            </div>
        </div>
    );
};

export default Modal;