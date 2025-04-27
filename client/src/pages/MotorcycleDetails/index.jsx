import { TableHeader, Button, ProductCard } from '@components';
import styles from './MotorcycleDetails.module.css';
import { useNavigate } from 'react-router';

const MotorcycleDetails = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['wrapper']}>
            <h1>This is Motorcycle Product page</h1>
        </div>
    );

};
  
export default MotorcycleDetails;