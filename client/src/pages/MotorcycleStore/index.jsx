import { TableHeader } from '@components';
import styles from './MotorcycleStore.module.css';

const MotorcycleStore = () => {
    return (
        <div className={ styles['wrapper'] }>
            <h1>This is the Motorcycle Store page.</h1>
            <TableHeader tableName='motorcycles' />
        </div>
    );
};

export default MotorcycleStore;
