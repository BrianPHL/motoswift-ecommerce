import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './ProductPage.module.css';
import { Button, ReturnButton, InputField, Modal } from '@components';
import { useProducts, useAuth, useCart, useReservation, useToast } from '@contexts';

const ProductPage = () => {

    const { product_id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalType, setModalType ] = useState('');
    const [ reservePreferredDate, setReservePreferredDate ] = useState('');
    const [ reserveNotes, setReserveNotes ] = useState('');
    const { products } = useProducts();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { addToReservations } = useReservation();
    const { showToast } = useToast();
    const navigate = useNavigate();
    
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

    const isOutOfStock = product?.stock_quantity <= 0;

    const requireAuth = (action) => {
        if (!user) {
            showToast('You must be signed in to perform this action!', 'error')
            return;
        }
        action();
    };

    const handleAddToCart = async () => {
        if (isOutOfStock) {
            showToast(`Sorry, ${product.label} is currently out of stock.`, 'error');
            return;
        }
        
        try {
            await addToCart({ 
                product_id: product['product_id'], 
                category: product['category'], 
                subcategory: product['subcategory'], 
                image_url: product['image_url'], 
                label: product['label'], 
                price: product['price'] 
            });
            showToast(`Successfully added ${ product['label'] } to your cart!`, 'success');
        } catch (err) {
            showToast(`Uh oh! An error occured during the addition of ${ product['label'] } to your cart! Please try again later.`, 'error');
        }
    };

    const handleAddToReservations = async () => {
        if (isOutOfStock) {
            showToast(`Sorry, ${product.label} is currently out of stock.`, 'error');
            return;
        }
        
        try {
            await addToReservations({
                product: { 
                    product_id: product['product_id'], 
                    category: product['category'], 
                    subcategory: product['subcategory'], 
                    image_url: product['image_url'], 
                    label: product['label'], 
                    price: product['price'] 
                },
                preferredDate: reservePreferredDate,
                notes: reserveNotes
            });
            showToast(`Successfully reserved ${ product['label'] }!`, 'success');
        } catch (err) {
            showToast(`Uh oh! An error occured during the reservation of ${ product['label'] }! Please try again later.`, 'error');
        }
    };

    if (loading || !product) return null;

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <div className={ styles['product'] }>
                <span className={ styles['pagewrap'] }>
                    <ReturnButton />
                </span>
                <div className={ styles['product-main'] }>
                    <img
                        src={ `https://res.cloudinary.com/dfvy7i4uc/image/upload/${ product['image_url'] }` }
                        alt={ `${ product['label'] }. Price: ${ product['price'] }` } 
                    />
                    <div className={ styles['product-details'] }>
                        <div className={ styles['product-details-info'] }>
                            <span>
                                <h2>{ product['label'] }</h2>
                                <h3>₱{ parseFloat(product['price']).toLocaleString('en-PH', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                </h3>
                                <p className={styles['stock-info']}>
                                    <strong>Availability:</strong> 
                                    <span className={isOutOfStock ? styles['out-of-stock'] : styles['in-stock']}>
                                        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                                    </span>
                                    {!isOutOfStock && <> ({product.stock_quantity} available)</>}
                                </p>
                            </span>
                        </div>

                        <div className={ styles['divider'] }></div>

                        <div className={ styles['product-details-ctas'] }>
                            {isOutOfStock && (
                                <div className={styles['stock-status-banner']}>
                                    <i className="fa-solid fa-exclamation-triangle"></i>
                                    <span>This product is currently out of stock</span>
                                </div>
                            )}
                            <Button
                                type='primary'
                                label='Reserve'
                                icon='fa-solid fa-calendar-check'
                                iconPosition='left'
                                externalStyles={ styles['reserve'] }
                                disabled={isOutOfStock}
                                action={
                                    () => { 
                                        requireAuth(() => {
                                            if (isOutOfStock) {
                                                showToast(`Sorry, ${product.label} is currently out of stock.`, 'error');
                                                return;
                                            }
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
                                disabled={isOutOfStock}
                                action={
                                    () => { 
                                        requireAuth(() => {
                                            if (isOutOfStock) {
                                                showToast(`Sorry, ${product.label} is currently out of stock.`, 'error');
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
                </div>

                <div className={ styles['product-description'] }>
                    <h2>Product Information</h2>
                    <div className={ styles['product-description-content'] }>
                        <div className={ styles['product-description-content-card'] }>
                            <div className={ styles['product-description-content-card-header'] }>
                                <h3>Description</h3>
                                <div className={ styles['highlight-divider'] }></div>
                            </div>
                            <p>{ product['description'] }</p>
                        </div>
                        <div className={ styles['product-description-content-card'] }>
                            <div className={ styles['product-description-content-card-header'] }>
                                <h3>Details</h3>
                                <div className={ styles['highlight-divider'] }></div>
                            </div>
                            <div className={ styles['product-description-content-card-details'] }>
                                <div className={ styles['product-description-content-card-details-item'] }>
                                    <p>Product ID</p>
                                    <p>{ product['product_id'] }</p>
                                </div>
                                <div className={ styles['product-description-content-card-details-item'] }>
                                    <p>Product Type</p>
                                    <p>{ product['category'] }</p>
                                </div>
                                <div className={ styles['product-description-content-card-details-item'] }>
                                    <p>Product Variant</p>
                                    <p>{ product['subcategory'] }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Modal
                label={ `Add ${ product['label'] } to Cart` }
                isOpen={ modalOpen && modalType === 'cart' }
                onClose={ () => setModalOpen(false) }
            >
                <div className={ styles['modal-infos'] }>
                    <h3>{ product['label'] }</h3>
                    <span>
                        <p>Are you sure you want to add <strong>{ product['label'] }</strong> to your cart?</p>
                        <p>Stock Available: <strong>{product.stock_quantity}</strong></p>
                    </span>
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
                label={ `Reserve ${ product['label'] }` }
                isOpen={ modalOpen && modalType === 'reservation' }
                onClose={ () => setModalOpen(false) }
            >
                <div className={ styles['modal-infos'] }>
                    <h3>{ product['label'] }</h3>
                    <span>
                        <p>Fill out the form below to reserve <strong>{ product['label'] }</strong></p>
                        <p>Stock Available: <strong>{product.stock_quantity}</strong></p>
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

        </div>
    );
};

export default ProductPage;
