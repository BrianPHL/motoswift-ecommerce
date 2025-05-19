import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, Anchor, InputField, ReturnButton, Modal } from '@components';
import styles from './Cart.module.css';
import { useCart, useReservation, useToast } from '@contexts';

const Cart = () => {
    const [modalType, setModalType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { cartItems, updateQuantity, removeFromCart, clearCart, refreshCart } = useCart();
    const [selectedItem, setSelectedItem] = useState(null);
    const [reservePreferredDate, setReservePreferredDate] = useState('');
    const [reserveNotes, setReserveNotes] = useState('');
    const { addToReservations } = useReservation();
    const { showToast } = useToast();
    const navigate = useNavigate();
    
    const [stockInfo, setStockInfo] = useState({});

    const subtotal = cartItems.reduce(
        (sum, item) => {
            const priceValue = parseFloat(item.price);
            return sum + (priceValue * item.quantity);
        }, 0);
    const tax = 0;
    const deductions = 0;
    const total = subtotal + tax - deductions;

    useEffect(() => {
        const fetchStockInfo = async () => {
            const stockData = {};
            
            for (const item of cartItems) {
                try {
                    const response = await fetch(`/api/stocks/${item.product_id}/stock`);
                    if (response.ok) {
                        const data = await response.json();
                        stockData[item.product_id] = data.stock_quantity;
                    }
                } catch (error) {
                    console.error(`Failed to fetch stock for product ${item.product_id}:`, error);
                    stockData[item.product_id] = null;
                }
            }
            
            setStockInfo(stockData);
        };
        
        if (cartItems.length > 0) {
            fetchStockInfo();
        }
    }, [cartItems]);
    
    const handleSingleReservation = async () => {
        try {
            const stockResponse = await fetch(`/api/stocks/${selectedItem.product_id}/stock`);
            if (stockResponse.ok) {
                const stockData = await stockResponse.json();
                if (stockData.stock_quantity <= 0) {
                    showToast(`Sorry, ${selectedItem.label} is currently out of stock.`, 'error');
                    setModalOpen(false);
                    await refreshCart();
                    return;
                }
            }

            await addToReservations({
                product: { 
                    product_id: selectedItem['product_id'],
                    category: selectedItem['category'],
                    subcategory: selectedItem['subcategory'],
                    image_url: selectedItem['image_url'],
                    label: selectedItem['label'],
                    price: selectedItem['price'],
                    quantity: selectedItem['quantity']
                },
                preferredDate: reservePreferredDate,
                notes: reserveNotes
            });
            removeFromCart(selectedItem['product_id']);
            setModalOpen(false);
        } catch (err) {
            showToast(`Error: ${err.message}`, 'error');
        }
    };

    const handleBatchReservation = async () => {
        if (cartItems.length === 0) return;

        try {
            for (const item of cartItems) {
                const stockResponse = await fetch(`/api/stocks/${item.product_id}/stock`);
                if (stockResponse.ok) {
                    const stockData = await stockResponse.json();
                    if (stockData.stock_quantity < item.quantity) {
                        showToast(`Sorry, not enough stock available for ${item.label}.`, 'error');
                        setModalOpen(false);
                        await refreshCart();
                        return;
                    }
                }
            }

            await addToReservations({
                products: cartItems.map(({ product_id, category, subcategory, image_url, label, price, quantity }) => ({
                    product_id, category, subcategory, image_url, label, price, quantity
                })),
                preferredDate: reservePreferredDate,
                notes: reserveNotes
            });
            clearCart();
            setModalOpen(false);
        } catch (err) {
            showToast(`Error: ${err.message}`, 'error');
        }
    };

    return (
        <>
            <div className={ styles['wrapper'] }>
                <div className={ styles['banner'] }></div>
                <div className={ styles['header'] }>
                    <ReturnButton />
                    <h1>Your Cart</h1>
                </div>
                <div className={ styles['container'] }>
                    { cartItems.length === 0 ? (
                        <div className={ styles['empty'] }>
                            <h3>Your cart is empty!</h3>
                            <p>Start browsing for items in <Anchor label="Motorcycles" link="/motorcycles" isNested={ false }/> or <Anchor label="Parts & Accessories" link="/parts-and-accessories" isNested={ false }/>.</p>
                        </div>
                    ) : (
                        <>
                            <div className={ styles['cart'] }>
                                { cartItems.map(item => {
                                    const availableStock = stockInfo[item.product_id];
                                    const isMaxQuantity = availableStock !== undefined && item.quantity >= availableStock;
                                    
                                    return (
                                        <div className={ styles['cart-item'] } key={ item['product_id'] }>
                                            <img
                                                src={ `https://res.cloudinary.com/dfvy7i4uc/image/upload/${ item['image_url'] }` }
                                                alt={ `${ item['label'] }. Price: ${ item['price'] }` } 
                                            />
                                            <div className={ styles['cart-item-details'] }>
                                                <div className={ styles['cart-item-details-left'] }>
                                                    <span>
                                                        <span>
                                                            <h3>{ item['label'] }</h3>
                                                            <h3>({ item['quantity'] }x)</h3>
                                                        </span>
                                                        <h4>{ item['category'] }, {item['subcategory']}</h4>
                                                        {availableStock !== undefined && (
                                                            <p className={styles['stock-info']}>
                                                                {isMaxQuantity ? (
                                                                    <span className={styles['max-quantity']}>Maximum quantity reached</span>
                                                                ) : (
                                                                    <span className={ styles['stock-available'] }>Available: {availableStock - item.quantity} more</span>
                                                                )}
                                                            </p>
                                                        )}
                                                    </span>
                                                    <div className={ styles['cart-item-quantity'] }>
                                                        <span style={{ display: 'flex', gap: '1rem' }}>
                                                            <Button
                                                                type='icon-outlined'
                                                                icon='fa-solid fa-minus'
                                                                action={ () => updateQuantity(item['product_id'], item['quantity'] - 1) }
                                                            />
                                                            <Button
                                                                type='icon-outlined'
                                                                icon='fa-solid fa-plus'
                                                                action={ () => updateQuantity(item['product_id'], item['quantity'] + 1) }
                                                                disabled={ item['quantity'] >= item['stock_quantity'] }
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={ styles['cart-item-details-right'] }>
                                                    <h3>₱{ parseFloat(item['price']).toLocaleString('en-PH', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }) }</h3>

                                                    <div className={ styles['cart-item-details-cta'] }>
                                                        <Button
                                                            type='icon-outlined'
                                                            icon='fa-solid fa-trash-can'
                                                            externalStyles={ styles['cart-item-remove'] }
                                                            action={ () => {
                                                                setSelectedItem(item);
                                                                setModalType('remove-confirmation');
                                                                setModalOpen(true);
                                                            }}
                                                        />
                                                        <Button
                                                            type='icon-outlined'
                                                            icon='fa-solid fa-square-up-right'
                                                            action={() => {
                                                                item.category.toLowerCase() === 'motorcycles' 
                                                                ? navigate(`/motorcycles/${item.product_id}`)
                                                                : navigate(`/parts-and-accessories/${item.product_id}`);
                                                            }}
                                                        />
                                                        <Button
                                                            type='primary'
                                                            label='Reserve'
                                                            icon='fa-solid fa-calendar'
                                                            iconPosition='left'
                                                            action={ () => {
                                                                setSelectedItem(item);
                                                                setModalType('single-reservation');
                                                                setModalOpen(true);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={ styles['summary'] }>
                                <h2>Summary</h2>
                                <div className={ styles['divider'] }></div>
                                <div className={ styles['summary-wrapper'] }>
                                    <div className={ styles['summary-item'] }>
                                        <h3>Sub-total</h3>
                                        <h3>₱{subtotal.toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}</h3>
                                    </div>
                                    <div className={ styles['summary-item'] }>
                                        <h3>Tax</h3>
                                        <h3>₱{ tax.toLocaleString() }</h3>
                                    </div>
                                    <div className={ styles['summary-item'] }>
                                        <h3>Shipping</h3>
                                        <h3 style={{ color: 'var(--accent-base)', fontWeight: '600' }}>FREE</h3>
                                    </div>
                                    <div className={ styles['summary-item'] }>
                                        <h3>Total</h3>
                                        <h3>₱{total.toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}</h3>
                                    </div>
                                </div>
                                <div className={ styles['divider'] }></div>
                                <div className={ styles['cta'] }>
                                    <Button
                                        type='primary'
                                        label='Proceed to Checkout'
                                        action={ () => {} }
                                        disabled
                                    />
                                    <Button
                                        type='primary'
                                        label='Proceed to Reservation'
                                        action={ () => {
                                            setModalType('batch-reservation')
                                            setModalOpen(true)
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            { modalType === 'single-reservation' ? (
                <Modal label='Reservation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <div className={ styles['modal-infos'] }>
                        <h3>{ selectedItem && selectedItem['label'] }</h3>
                        <span>
                            <p>Fill out the form below to reserve <strong>{ selectedItem && selectedItem['label'] }</strong></p>
                            {stockInfo[selectedItem?.product_id] !== undefined && (
                                <p>Stock Available: <strong>{stockInfo[selectedItem.product_id]}</strong></p>
                            )}
                        </span>
                    </div>
                    <div className={ styles['inputs-container'] }>
                        <div className={ styles['input-wrapper'] }>
                            <label>Preferred Date</label>
                            <InputField
                                hint='Your preferred date...'
                                type='date'
                                value={ reservePreferredDate }
                                onChange={ (e) => setReservePreferredDate(e.target.value) }
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label>Notes (Optional)</label>
                            <textarea
                                placeholder="Additional information..."
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
                                handleSingleReservation();
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
            ) : modalType === 'remove-confirmation' ? (
                <Modal label='Remove from Cart Confirmation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <p className={ styles['modal-info'] }>Are you sure you want to remove <strong>{ selectedItem && selectedItem['label'] }</strong> from your cart?</p>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Confirm'
                            type='primary'
                            action={ () => {
                                removeFromCart(selectedItem['product_id']);
                                setModalOpen(false);
                            }}
                            externalStyles={ styles['modal-warn'] }
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
            ) : modalType === 'clear-confirmation' ? (
                <Modal label='Clear Cart Confirmation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <p className={ styles['modal-info'] }>Are you sure you want to clear your cart?</p>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Confirm'
                            type='primary'
                            action={ () => {
                                clearCart();
                                setModalOpen(false);
                            }}
                            externalStyles={ styles['modal-warn'] }
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
            ) : modalType === 'batch-reservation' ? (
                <Modal label='Batch Reservation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                    <div className={ styles['modal-infos'] }>
                        <h3>Batch Reservation</h3>
                        <span>
                            <p>Fill out the form below to reserve all items in your cart</p>
                            <p><strong>Total:</strong> ₱{ total.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) }</p>
                        </span>
                    </div>
                    <div className={ styles['inputs-container'] }>
                        <div className={ styles['input-wrapper'] }>
                            <label>Preferred Date</label>
                            <InputField
                                hint='Your preferred date...'
                                type='date'
                                value={ reservePreferredDate }
                                onChange={ (e) => setReservePreferredDate(e.target.value) }
                                isSubmittable={ false }
                            />
                        </div>
                        <div className={ styles['input-wrapper'] }>
                            <label>Notes (Optional)</label>
                            <textarea
                                placeholder="Additional information..."
                                value={ reserveNotes }
                                onChange={ event => setReserveNotes(event['target']['value']) }
                            />
                        </div>
                    </div>
                    <div className={ styles['modal-ctas'] }>
                        <Button
                            label='Confirm Reservation'
                            type='primary'
                            action={ handleBatchReservation }
                            disabled={ !reservePreferredDate }
                        />
                        <Button
                            label='Cancel'
                            type='secondary'
                            action={ () => setModalOpen(false) }
                        />
                    </div>
                </Modal>
            ) : null };
        </>
    );
};

export default Cart;
