
import { Button, ProductCard, TableHeader } from '@components';
import styles from './MotorcycleStore.module.css';

const MotorcycleStore = () => {
    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <span className={styles['pagewrap']}>
                <Button
                    icon='fa-solid fa-angle-left'
                    type='secondary'
                    label='Parts and Accessories'
                    action={ () => navigate (-1)}
                    iconPosition='left' >      
                </Button>
            </span>

            <h1>This is the Motorcycle Store page.</h1>
            <TableHeader tableName='motorcycles' />
            
            <div className={styles['container']}>
                <div className={styles['cardContainer']}>
                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />
                    
                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />
                    
                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product"
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />


                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product"
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />


                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product"
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />

                    <ProductCard
                        tags={['Hot', 'Adventure']}
                        name="Honda Beat (Premium)"
                        price="PHP123,456.78"
                        description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                        imageSrc="https://via.placeholder.com/186x174?text=Product" 
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />
            
                </div>

            </div>

            <div className={styles['paginationContainer']}>
                <div className={styles['results']}>
                    <p>Showing <b>12</b> out of <b>20</b> results </p>
                    <p>Sort: None | Filter: None</p>
                </div>
                <div className={styles['pagination']}>
                    <Button
                    type="icon"
                    icon="fa-solid fa-chevron-left"
                    action={() => console.log('Clicked')}
                    isOutlined={true} 
                    />

                    <Button label="1" type="secondary" action={() => console.log('Submit')} />

                    <Button label="2" type="secondary" action={() => console.log('Submit')} />

                    <Button
                    type="icon"
                    icon="fa-solid fa-chevron-right"
                    action={() => console.log('Clicked')}
                    isOutlined={true} 
                    />
                    


                </div>
            </div>

                

            
            
            

            
        </div>
    );
};

export default MotorcycleStore;
