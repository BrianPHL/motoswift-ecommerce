import styles from './Home.module.css';
import { Button } from "../../components";
import { TableHeader } from '../../components';
import { ProductCard } from '../../components';


import ProductCard from '../../components/ProductCard'; // ✅ CORRECT


const Home = () => {
    return (
        <div className={ styles['wrapper'] }>
<<<<<<< Updated upstream
            
            <ProductCard
=======
            <div className={styles['container']}>
                <div className={styles['navigation']}>
                    <img></img>
                    <Button
                    label={
                        <>
                        <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i>
                        Motorcycles
                        </>
                    }
                    type="secondary"
                    action={() => window.history.back()}
                    />


                    <h1>Find Your Perfect Ride</h1>
                    <div className={styles['search']}>
                    <TableHeader tableName="motorcycles" />
                    </div>
                </div>

                <div className={styles['products']}>
                <ProductCard
>>>>>>> Stashed changes
                tags={['Hot', 'Adventure', 'XD']}
                name="Honda Beat (Premium)"
                price="PHP123,456.78"
                description="108cc 4-stroke single | 8.8hp | 9.21Nm"
                imageSrc="https://via.placeholder.com/186x174?text=Product" // optional placeholder
                onReserve={() => console.log('Reserved')}
                onCart={() => console.log('Added to cart')}
                />
<<<<<<< Updated upstream
=======


                </div>
            </div>
>>>>>>> Stashed changes
        </div>

        
    );
};

export default Home;
