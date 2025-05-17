import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, ReturnButton, Modal, InputField } from '@components';
import { useProducts, useCart, useReservation, useAuth, useToast } from '@contexts';
import styles from './ProductPage.module.css';

const MotorcyclesDetails = () => {

    const navigate = useNavigate();
    const { product_id } = useParams();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { addToReservations } = useReservation();
    const { user } = useAuth();
    const { showToast } = useToast();
    const [ product, setProduct ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalType, setModalType ] = useState('');
    const [ reservePreferredDate, setReservePreferredDate ] = useState('');
    const [ reserveNotes, setReserveNotes ] = useState('');

    useEffect(() => {

        if (products && products['length'] > 0) {

            const foundProduct = products.find(product => product.product_id.toString() === product_id);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                showToast('Product not found!', 'error');
                navigate('/motorcycles');
            }
            
            setLoading(false);

        }

    }, [ product_id, products, navigate, showToast ]);

    const requireAuth = (action) => {
        if (!user) {
            showToast('You must be signed in to perform this action!', 'error')
            return;
        }
        action();
    };

    const handleAddToCart = async () => {
        try {
            await addToCart({ product_id: product['product_id'], category: product['category'], subcategory: product['subcategory'], image_url: product['image_url'], label: product['label'], price: product['price'] });
            showToast(`Successfully added ${ product['label'] } to your cart!`, 'success');
        } catch (err) {
            showToast(`Uh oh! An error occured during the addition of ${ product['label'] } to your cart! Please try again later. Error message: ${ err }`, 'error');
        }
    };

    const handleAddToReservations = async () => {
        try {
            await addToReservations({
                product: { product_id: product['product_id'], category: product['category'], subcategory: product['subcategory'], image_url: product['image_url'], label: product['label'], price: product['price'] },
                preferredDate: reservePreferredDate,
            });
            showToast(`Successfully added ${ product['label'] } to your reservations!`, 'success');
        } catch (err) {
            showToast(`Uh oh! An error occured during the reservation of ${ product['label'] }! Please try again later. Error message: ${ err }`, 'error');
        }
   
    };

    if (loading) {
        return (
            <div className={styles['wrapper']}>
                <div className={styles['header']}>
                    <ReturnButton />
                    <h1>Product Details</h1>
                </div>
                <div className={styles['loading']}>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <p>Loading product, please wait...</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={ styles['wrapper'] }>
                <div className={ styles['header'] }>
                    <ReturnButton />
                    <h1>Product Details</h1>
                </div>
                <div className={ styles['product'] }>
                    <div className={ styles['product-image'] }>
                        <img
                            src={ `https://res.cloudinary.com/dfvy7i4uc/image/upload/${ product['image_url'] }` }
                            alt={ `${ product['label'] }. Price: ${ product['price'] }` } 
                        />
                    </div>
                    <div className={ styles['product-details'] }>
                        <div className={ styles['product-details-header'] }>
                            <h2>{ product['label'] }</h2>
                            <h3><strong>Category:</strong> { product['category'] } | <strong>Sub-category:</strong> { product['subcategory'] }</h3>
                        </div>
                        <div className={ styles['product-details-info'] }>
                            <span>
                                <h4><strong>Description</strong></h4>
                                <p>{ product['description'] }</p>
                            </span>
                            <h3>₱{ parseFloat(product['price']).toLocaleString('en-PH', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </h3>
                        </div>
                        <div className={ styles['product-details-ctas'] }>
                            <Button
                                type='primary'
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
                                type='secondary'
                                icon='fa-solid fa-cart-plus'
                                iconPosition='left'
                                label='Add to Cart'
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
                    <p className={ styles['modal-info'] }>Are you sure you want to add <strong>{ product['label'] }</strong> in your cart?</p>
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
            ) : null }
        </>
    );
};

export default MotorcyclesDetails;
