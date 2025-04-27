import { useNavigate } from 'react-router';
import { Button } from '@components';
import styles from './ReturnButton.module.css';

const ReturnButton = ({}) => {

    const navigate = useNavigate();

    return (
        <Button
            icon='fa-solid fa-angle-left'
            type='secondary'
            label='Return'
            iconPosition='left'
            action={ () => { navigate(-1) } }
            externalStyles={ styles['return'] }
        />
    );
};

export default ReturnButton;
