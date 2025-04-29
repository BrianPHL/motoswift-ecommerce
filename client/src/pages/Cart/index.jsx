import { useNavigate } from 'react-router';
import { Button, Anchor, InputField, ReturnButton } from '@components';
import styles from './Cart.module.css';
import { useCart } from '@contexts';

const Cart = () => {

    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price.replace(/[^\d]/g, "")) * item.quantity,
        0
    );
    const tax = 0;
    const deductions = 0;
    const total = subtotal + tax - deductions;

    return (
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
                            <div className={ styles['cart-header'] }>
                                <h3>Product</h3>
                                <h3>Quantity</h3>
                                <h3>Price</h3>
                                <h3>Total</h3>
                            </div>
                            <div className={ styles['divider'] }></div>
                            { cartItems.map(item => (
                                <div className={ styles['cart-item'] } key={ item.id }>
                                    <div className={ styles['cart-item-product'] }>
                                        <img src={ item.img } alt={ item.label } />
                                        <div className={ styles['cart-item-product-details'] }>
                                            <div className={ styles['cart-item-product-details-info'] }>
                                                <h3>{ item.category } ({ item.subcategory })</h3>
                                                <h2>{ item.label }</h2>
                                            </div>
                                            <div className={ styles['cart-item-product-details-cta'] }>
                                                <Button
                                                    type='secondary'
                                                    label='View item'
                                                    icon='fa-solid fa-square-up-right'
                                                    iconPosition='right'
                                                    action={ () => navigate(`/motorcycles/${item.id}`) }
                                                />
                                                <Button
                                                    type='icon-outlined'
                                                    icon='fa-solid fa-trash-can'
                                                    action={ () => removeFromCart(item.id) }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ styles['cart-item-quantity'] }>
                                        <InputField
                                            hint='Qty...'
                                            isSubmittable={ false }
                                            type='number'
                                            value={ item.quantity }
                                            min={1}
                                            onChange={e => updateQuantity( item.id, e.target.value )}
                                        />
                                    </div>
                                    <div className={ styles['cart-item-price'] }>
                                        <h3>{ item.price }</h3>
                                    </div>
                                    <div className={ styles['cart-item-total'] }>
                                        <h3>
                                            ₱ {(Number(item.price.replace(/[^\d]/g, "")) * item.quantity).toLocaleString()}
                                        </h3>
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
                                    <h3>Deductions</h3>
                                    <h3>₱{ deductions.toLocaleString() }</h3>
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
                                    action={ () => {} }
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default Cart;