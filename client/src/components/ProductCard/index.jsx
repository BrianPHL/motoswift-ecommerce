import { useCart } from '@contexts';
import { useNavigate } from 'react-router';
import styles from './ProductCard.module.css';
import { Button } from '@components';

const ProductCard = ({ id, category, subcategory, img, label, price, onReserve, onCart }) => {
    
    if (!id || !category || !subcategory || !img || !label || !price || !onReserve || !onCart) return null;
    
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className={ styles['wrapper'] }>
            <img className={ styles['product-img'] } src={ img } alt={ `${ label }. Price: ${ price }` } />
            <div className={ styles['divider'] }></div>
            <div className={ styles['details'] }>
                <div className={ styles['text'] }>
                    <h2>{ label }</h2>
                    <h3>{ price }</h3>
                </div>
                <Button
                    type='icon'
                    icon='fa-solid fa-square-arrow-up-right'
                    action={ () => { navigate('#') } }
                />
            </div>
            <div className={ styles['divider'] }></div>
            <div className={ styles['ctas'] }>
                <Button
                    type='secondary'
                    label='Reserve'
                    icon='fa-solid fa-calendar-check'
                    iconPosition='left'
                    action={ onReserve }
                    externalStyles={ styles['reserve'] }
                />
                <Button
                    type='icon-outlined'
                    icon='fa-solid fa-cart-plus'         
                    action={ () => addToCart({ id, category, subcategory, img, label, price }) }
                    externalStyles={ styles['cart'] }
                />
            </div>
        </div>
    );
};

export default ProductCard;
