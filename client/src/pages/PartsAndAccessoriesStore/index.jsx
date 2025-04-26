import { TableHeader, Button, ProductCard } from '@components';
import styles from './PartsAndAccessoriesStore.module.css';
import { useNavigate } from 'react-router';


const PartsAndAccessoriesStore = () => {
    const navigate = useNavigate();
    return (

        
        
        
        <div className={styles['wrapper']}>
            
                
                <div className={ styles['banner'] }>
            </div>
            
            
             <span className={styles['pagewrap']}>
             
            
             <Button
                        icon='fa-solid fa-angle-left'
                        type='secondary'
                        label='Parts and Accessories'
                        action={ () => navigate (-1)}
                        iconPosition='left' >
                            
                        </Button>
              

                </span>

                
                <h1>Find The Perfect Parts For Your Ride</h1>
                <TableHeader tableName='parts-and-accessories' />

                <div className={styles['container']}>
                <div className={styles['products']}>
                <ProductCard
                    tags={['Hot', 'Adventure', 'XD']}
                    name="Honda Beat (Premium)"
                    price="PHP123,456.78"
                    description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                    imageSrc="https://via.placeholder.com/186x174?text=Product" // optional placeholder
                    onReserve={() => console.log('Reserved')}
                    onCart={() => console.log('Added to cart')}
                />
                </div>
           
            </div>
         </div>
        
    );
};

export default PartsAndAccessoriesStore;
