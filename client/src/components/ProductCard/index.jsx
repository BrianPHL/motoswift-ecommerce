import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProductCard.module.css';
import { InputField, Button, Modal } from '@components';
import { useAuth, useCart, useReservation, useToast } from '@contexts';

const ProductCard = ({ product_id, category, subcategory, image_url, label, price, stock_quantity = 0 }) => {
    
    if (!product_id || !category || !subcategory || !image_url || !label || !price) return null;
    
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalType, setModalType ] = useState('');
    const [ reservePreferredDate, setReservePreferredDate ] = useState('');
    const [ reserveNotes, setReserveNotes ] = useState('');
    const [ productQuantity, setProductQuantity ] = useState(1);
    const { addToCart } = useCart();
    const { addToReservations } = useReservation();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const isOutOfStock = stock_quantity <= 0;
    
    const getStockStatusClass = () => {
        if (stock_quantity <= 0) return styles['stock-out'];
        if (stock_quantity <= 5) return styles['stock-low'];
        return styles['stock-good'];
    };

    const getStockStatusText = () => {
        if (stock_quantity <= 0) return "Out of Stock";
        if (stock_quantity <= 5) return `Low Stock (${stock_quantity})`;
        return `In Stock (${stock_quantity})`;
    };

    const formattedPrice = parseFloat(price).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const requireAuth = (action) => {
        if (!user) {
            showToast('You must be signed in to perform this action!', 'error')
            return;
        }
        action();
    };

    const handleAddToCart = async () => {
        if (isOutOfStock) {
            showToast(`Sorry, ${label} is currently out of stock.`, 'error');
            return;
        }
        
        try {
            await addToCart({ product_id, category, subcategory, image_url, label, price, stock_quantity, quantity: productQuantity });
            showToast(`Successfully added ${ label } to your cart!`, 'success');
        } catch (err) {
            showToast(`Uh oh! An error occured during the addition of ${ label } to your cart! Please try again later.`, 'error');
        }
    };

    const handleAddToReservations = async () => {
        if (isOutOfStock) {
            showToast(`Sorry, ${label} is currently out of stock.`, 'error');
            return;
        }
        
        try {
            await addToReservations({
                product: { product_id, category, subcategory, image_url, label, price, quantity },
                preferredDate: reservePreferredDate,
                notes: reserveNotes
            });
            showToast(`Successfully added ${ label } to your reservations!`, 'success');
            setReservePreferredDate('');
            setReserveNotes('');
        } catch (err) {
            showToast(`Uh oh! An error occured during the reservation of ${ label }! Please try again later.`, 'error');
        }
    };

    return (
        <>
            <div className={ styles['wrapper'] }>
                {isOutOfStock && (
                    <div className={styles['out-of-stock-badge']}>
                        Out of Stock
                    </div>
                )}
                <img
                    className={ styles['product-img'] }
                    src={ `https://res.cloudinary.com/dfvy7i4uc/image/upload/${ image_url }` }
                    alt={ `${ label }. Price: ${ price }` } />
                <div className={ styles['divider'] }></div>
                <div className={ styles['details'] }>
                    <div className={ styles['text'] }>
                        <h2>{ label }</h2>
                        <h3>₱{ formattedPrice }</h3>
                        <div className={`${styles['stock-indicator']} ${getStockStatusClass()}`}>
                            <i className={`fa-solid ${isOutOfStock ? 'fa-xmark' : stock_quantity <= 5 ? 'fa-triangle-exclamation' : 'fa-check'}`}></i>
                            <p>{getStockStatusText()}</p>
                        </div>
                    </div>
                    <Button
                        type='icon'
                        icon='fa-solid fa-square-arrow-up-right'
                        action={ () => {
                            category.toLowerCase() === 'motorcycles'
                            ? navigate(`/motorcycles/${ product_id }`)
                            : navigate(`/parts-and-accessories/${ product_id }`)
                        }}
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
                        disabled={isOutOfStock}
                        action={
                            () => { 
                                requireAuth(() => {
                                    if (isOutOfStock) {
                                        showToast(`Sorry, ${label} is currently out of stock.`, 'error');
                                        return;
                                    }
                                    setModalType('reservation');
                                    setModalOpen(true);
                                })
                            } 
                        }
                    />
                    <Button
                        type='icon-outlined'
                        icon='fa-solid fa-cart-plus'         
                        externalStyles={ styles['cart'] }
                        disabled={isOutOfStock}
                        action={
                            () => { 
                                requireAuth(() => {
                                    if (isOutOfStock) {
                                        showToast(`Sorry, ${label} is currently out of stock.`, 'error');
                                        return;
                                    }
                                    setModalType('cart');
                                    setModalOpen(true);
                                })
                            } 
                        }
                    />
                </div>
            </div>
            <Modal
                label={ `Add ${ label } to Cart` }
                isOpen={ modalOpen && modalType === 'cart' }
                onClose={ () => setModalOpen(false) }
            >
                <div className={ styles['modal-infos'] }>
                    <h3>{ label }</h3>
                    <span>
                        <p>Are you sure you want to add <strong>{ label }</strong> to your cart?</p>
                        <p style={{ marginTop: '1rem' }}>Stock Available: <strong>{stock_quantity}</strong></p>
                    </span>
                </div>
                <div className={ styles['modal-infos'] } style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    
                    <span style={{ display: 'flex', gap: '1rem' }}>
                        <Button
                            type='icon-outlined'
                            icon='fa-solid fa-minus'
                            action={ () => setProductQuantity(prevQuantity => prevQuantity - 1) }
                            disabled={ productQuantity <= 1 }
                        />
                        <Button
                            type='icon-outlined'
                            icon='fa-solid fa-plus'
                            action={ () => setProductQuantity(prevQuantity => prevQuantity + 1) }
                            disabled={ productQuantity >= stock_quantity }
                        />
                    </span>

                    <p style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--tg-primary)' }}>{ productQuantity }x</p>

                </div>
                <div className={ styles['modal-ctas'] }>
                    <Button 
                        type="secondary" 
                        label="Cancel" 
                        action={ () => setModalOpen(false) } 
                    />
                    <Button 
                        type="primary" 
                        label="Add to Cart" 
                        action={ () => { 
                            handleAddToCart(); 
                            setModalOpen(false);
                        }}
                    />
                </div>
            </Modal>
            <Modal
                label={ `Reserve ${ label }` }
                isOpen={ modalOpen && modalType === 'reservation' }
                onClose={ () => setModalOpen(false) }
            >
                <div className={ styles['modal-infos'] }>
                    <h3>{ label }</h3>
                    <span>
                        <p>Fill out the form below to reserve <strong>{ label }</strong></p>
                        <p>Stock Available: <strong>{stock_quantity}</strong></p>
                    </span>
                </div>
                <div className={ styles['inputs-container'] }>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="preferred_date">
                            Preferred Date
                        </label>
                        <InputField
                            hint='Your preferred date...'
                            type='date'
                            value={ reservePreferredDate }
                            onChange={ (e) => setReservePreferredDate(e.target.value) }
                            isSubmittable={ false }
                        />
                    </div>
                    <div className={ styles['input-wrapper'] }>
                        <label htmlFor="notes">
                            Notes (Optional)
                        </label>
                        <textarea
                            placeholder="Additional information..."
                            value={ reserveNotes }
                            onChange={ (e) => setReserveNotes(e.target.value) }
                        ></textarea>
                    </div>
                </div>
                <div className={ styles['modal-ctas'] }>
                    <Button 
                        type="secondary" 
                        label="Cancel" 
                        action={ () => setModalOpen(false) } 
                    />
                    <Button 
                        type="primary" 
                        label="Reserve" 
                        action={ () => { 
                            handleAddToReservations(); 
                            setModalOpen(false);
                        }}
                        disabled={ !reservePreferredDate }
                    />
                </div>
            </Modal>
        </>
    );
};

export default ProductCard;

