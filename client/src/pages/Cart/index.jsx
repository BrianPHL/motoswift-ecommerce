import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Anchor, InputField, ReturnButton, Modal } from '@components';
import styles from './Cart.module.css';
import { useCart, useReservation } from '@contexts';

const Cart = () => {

    const [ modalType, setModalType ] = useState('');
    const [ modalOpen, setModalOpen ] = useState(false);
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const [ selectedItem, setSelectedItem ] = useState(null);
    const [ reservePreferredDate, setReservePreferredDate ] = useState('');
    const [ reserveNotes, setReserveNotes ] = useState('');
    const { addToReservations } = useReservation();
    const navigate = useNavigate();
const subtotal = cartItems.reduce(
    (sum, item) => {
        const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
        return sum + (priceValue * item.quantity);
    }, 0);
    const tax = 0;
    const deductions = 0;
    const total = subtotal + tax - deductions;
    
    const handleSingleReservation = () => {
        addToReservations({
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
        });
        removeFromCart(selectedItem['product_id']);
    };
    
    const handleBatchReservation = () => {
        if (cartItems.length === 0) return;
        addToReservations({
            products: cartItems.map(({ product_id, category, subcategory, image_url, label, price, quantity }) => ({
                product_id, category, subcategory, image_url, label, price, quantity
            })),
            preferredDate: reservePreferredDate,
        });
        clearCart();
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
                                { cartItems.map(item => (
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
                                                </span>
                                                <div className={ styles['cart-item-quantity'] }>
                                                    <span style={{ display: 'flex', gap: '0.25rem' }}>
                                                        <Button
                                                            type='icon-outlined'
                                                            icon='fa-solid fa-minus'
                                                            action={ () => updateQuantity(item['product_id'], item['quantity'] - 1) }
                                                        />
                                                        <Button
                                                            type='icon-outlined'
                                                            icon='fa-solid fa-plus'
                                                            action={ () => updateQuantity(item['product_id'], item['quantity'] + 1) }
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
                                                        action={ () => console.log("View") }
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
                                ))}
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
            { modalType === 'batch-reservation' ? (
                <Modal label='Batch Reservation Form' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
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
                                handleBatchReservation();
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
            ) : modalType === 'single-reservation' ? (
                <Modal label='Single Reservation Form' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
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
                    <p className={ styles['modal-info'] }>Are you sure you want to remove <strong>{ selectedItem['label'] }</strong> from your cart?</p>
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
            ) : null };
        </>
    );

};

export default Cart;