import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Anchor, InputField, ReturnButton, Modal } from '@components';
import styles from './Cart.module.css';
import { useCart, useReservation } from '@contexts';

const Cart = () => {

    const { addToReservations } = useReservation();
    const [modalOpen, setModalOpen] = useState(false);
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price.replace(/[^\d]/g, "")) * item.quantity,
        0
    );
    const tax = 0;
    const deductions = 0;
    const total = subtotal + tax - deductions;
    const handleBatchReserve = (date) => {
        if (cartItems.length === 0) return;
        addToReservations({
            products: cartItems.map(({ id, category, subcategory, img, label, price }) => ({
                id, category, subcategory, img, label, price
            })),
            preferredDate: date,
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
                                                        type='icon'
                                                        icon='fa-solid fa-plus'
                                                        action={ event => updateQuantity(item['product_id'], event['target']['value'] + 1) }
                                                    />
                                                    <Button
                                                        type='icon'
                                                        icon='fa-solid fa-minus'
                                                        action={ event => updateQuantity(item['product_id'], event['target']['value'] - 1) }
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <div className={ styles['cart-item-details-right'] }>

                                            <h3>₱{ item['price'] }</h3>

                                            <div className={ styles['cart-item-details-cta'] }>
                                                <Button
                                                    type='icon-outlined'
                                                    icon='fa-solid fa-trash-can'
                                                    externalStyles={ styles['cart-item-remove'] }
                                                    action={ () => removeFromCart(item['product_id']) }
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
                                                    action={ () => console.log("Reserve") }
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
                                    <h3>₱{ subtotal.toLocaleString() }</h3>
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
                                    <h3>₱{ total.toLocaleString() }</h3>
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
                                    action={ () => setModalOpen(true) }
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
        <Modal
            open={modalOpen}
            message="Select your preferred reservation date for all items in your cart."
            isInput={true}
            onSubmit={handleBatchReserve}
            onClose={() => setModalOpen(false)}
        />
        </>
    );

};

export default Cart;