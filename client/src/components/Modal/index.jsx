import styles from './Modal.module.css';
import { Button } from '@components';

const Modal = ({ open, message, onClose }) => {

    if (!open) return null;

    return (
        <div className={ styles['modal'] } onClick={onClose}>
          <div className={styles['box'] } onClick={e => e.stopPropagation()}>
            <p>{message}</p>
            <Button
              type='secondary'
              label='Close'
              action={ () => onClose() }
            />
          </div>
        </div>
    );

};

export default Modal;
