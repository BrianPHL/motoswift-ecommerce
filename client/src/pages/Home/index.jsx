import styles from './Home.module.css';

import ProductCard from '../../components/ProductCard'; // ✅ CORRECT


const Home = () => {
    return (
        <div className={ styles['wrapper'] }>
            
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

        
    );
};

export default Home;
