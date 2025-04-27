import { TableHeader, Button, ProductCard } from '@components';
import styles from './PartsAndAccessoriesDetails.module.css';
import { useNavigate } from 'react-router';

const PartsAndAccessoriesDetails = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['wrapper']}>
            <h1>This is Parts Product page</h1>
        </div>
    );

};
  
export default PartsAndAccessoriesDetails;