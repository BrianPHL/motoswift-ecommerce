import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './ProductCard.module.css';
import { InputField, Button, Modal } from '@components';
import { useAuth, useCart, useReservation, useToast } from '@contexts';

const ProductCard = ({ product_id, category, subcategory, image_url, label, price }) => {
    
    if (!product_id || !category || !subcategory || !image_url || !label || !price) return null;
    
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalType, setModalType ] = useState('');
    const [ reservePreferredDate, setReservePreferredDate ] = useState('');
    const [ reserveNotes, setReserveNotes ] = useState('');
    const { addToCart } = useCart();
    const { addToReservations } = useReservation();
    const { user } = useAuth();
    const { showToast } = useToast();
    const formattedPrice = parseFloat(price).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const navigate = useNavigate();

    const requireAuth = (action) => {
        if (!user) {
            showToast('You must be signed in to perform this action!', 'error')
            return;
        }
        action();
    };

    const handleAddToCart = async () => {
        try {
            await addToCart({ product_id, category, subcategory, image_url, label, price });
            showToast(`Successfully added ${ label } to your cart!`, 'success');
        } catch (err) {
            showToast(`Uh oh! An error occured during the addition of ${ label } to your cart! Please try again later. Error message: ${ err }`, 'error');
        }
    };

    const handleAddToReservations = async () => {
        try {
            await addToReservations({
                product: { product_id, category, subcategory, image_url, label, price },
                preferredDate: reservePreferredDate,
            });
        } catch (err) {
            showToast(`Uh oh! An error occured during the reservation of ${ label }! Please try again later. Error message: ${ err }`, 'error');
        }
   
    };

    return (
        <>
            <div className={ styles['wrapper'] }>
                <img
                    className={ styles['product-img'] }
                    src={ `https://res.cloudinary.com/dfvy7i4uc/image/upload/${ image_url }` }
                    alt={ `${ label }. Price: ${ price }` } />
                <div className={ styles['divider'] }></div>
                <div className={ styles['details'] }>
                    <div className={ styles['text'] }>
                        <h2>{ label }</h2>
                        <h3>₱{ parseFloat(price).toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </h3>
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
                        action={
                            () => { 
                                requireAuth(() => {
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
                        action={
                            () => { 
                                requireAuth(() => {
                                    setModalType('cart');
                                    setModalOpen(true);
                                })
                            } 
                        }
                    />
                </div>
            </div>
            { modalType === 'reservation' ? (
                <Modal label='Reservation Form' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <div className={ styles['inputs-container'] }>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="preferred_date">
                                Preferred Date
                            </label>
                            <InputField
                                hint='Your preferred date...'
                                type='date'
                                value={ reservePreferredDate }
                                onChange={ event => setReservePreferredDate(event['target']['value']) }
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label htmlFor="notes">
                                Notes (Optional)
                            </label>
                            <textarea
                                placeholder='Your note/special request...'
                                name="notes"
                                id='notes'
                                value={ reserveNotes }
                                onChange={ event => setReserveNotes(event['target']['value']) }
                            />
                        </div>
                    </div>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Confirm Reservation'
                            type='primary'
                            action={ () => {
                                handleAddToReservations();
                                setModalType('');
                                setModalOpen(false);
                            }}
                            disabled={ !reservePreferredDate }
                        />
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                            }}
                        />
                    </div>
                </Modal>
            ) : modalType === 'cart' ? (
                <Modal label='Add to Cart Confirmation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <p className={ styles['modal-info'] }>Are you sure you want to add <strong>{ label }</strong> in your cart?</p>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Confirm'
                            type='primary'
                            action={ () => {
                                handleAddToCart();
                                setModalOpen(false);
                            }}
                        />
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => {
                                setModalType('');
                                setModalOpen(false);
                            }}
                        />
                    </div>
                </Modal>
            ) : null };
            
        </>
    );
};

export default ProductCard;
