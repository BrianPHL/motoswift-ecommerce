import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProductCard.module.css';
import { Button, Modal } from '@components';
import { useAuth, useCart, useReservation } from '@contexts';

const ProductCard = ({ id, category, subcategory, img, label, price }) => {
    
    if (!id || !category || !subcategory || !img || !label || !price) return null;
    
    const [ modalOpen, setModalOpen ] = useState(false);
    const { addToCart } = useCart();
    const { addToReservations } = useReservation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const requireAuth = (action) => {
        if (!user) {
            setModalOpen(true);
            return;
        };
        console.log('bobo')
        action();
    };

    return (
        <>
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
                        externalStyles={ styles['reserve'] }
                        action={ () => { requireAuth(() => addToReservations({ id, category, subcategory, img, label, price })) } }
                    />
                    <Button
                        type='icon-outlined'
                        icon='fa-solid fa-cart-plus'         
                        externalStyles={ styles['cart'] }
                        action={ () => requireAuth(() => addToCart({ id, category, subcategory, img, label, price })) }
                    />
                </div>
            </div>
            <Modal
                open={ modalOpen }
                message="You must be signed in to perform this action! Use these credentials: email: john.doe@motoswift.com | pw: john.doe073"
                onClose={ () => setModalOpen(false) }
            />
        </>
    );
};

export default ProductCard;
