import styles from './ProductCard.module.css';
import { Button } from '@components';

const ProductCard = ({ tags = [], imageSrc, name, price, description, onReserve, onCart }) => {
    return (
        <div className={styles['ProductCard']}>
            <div className={styles['tags']}>
                {tags.map((tag, index) => (
                    <div key={index} className={styles['hotTag']}>
                        <p>{tag}</p>
                    </div>
                ))}
            </div>

            <div className={styles['imageContainer']}>
                {imageSrc ? (
                    <img src={imageSrc} alt={name} />
                ) : (
                    <div className={styles['placeholderBox']}>No Image</div>
                )}
            </div>

            <div className={styles['cardLabel']}>
                <p>{name}</p>
                <p>{price}</p>
                <br />
                <h6 className={styles['extraInfo']}>{description}</h6>
            </div>

            <div className={styles['buttonCard']}>
                <Button
                    type="primary"
                    label="Reserve Now"
                    action={onReserve}
                />
                <div className={styles['iconBox']}>
                    <Button
                        type="icon"
                        icon="fa-solid fa-cart-shopping"
                        isOutlined={false}
                        action={onCart}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
