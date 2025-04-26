import { useNavigate } from 'react-router';
import { Button, Anchor, InputField } from '@components';
import styles from './Cart.module.css';

const Cart = () => {

    const navigate = useNavigate();
    const cartItems = [
        []
    ];

    // TODO: Add a separate item list in cart.

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <div className={ styles['header'] }>
                <Button
                    icon='fa-solid fa-angle-left'
                    type='secondary'
                    label='Go back'
                    iconPosition='left'
                    action={ () => { navigate(-1) } }
                />
                <h1>Your Cart</h1>
            </div>
            <div className={ styles['container'] }>
                { cartItems.length === 0 ? (
                    <div className={ styles['empty'] }>
                        <h3>Your cart is empty!</h3>
                        <p>Start browsing for items in <Anchor label="Motorcycles" href="/motorcycles" isNested={ false }/> or <Anchor label="Parts & Accessories" href="/parts-and-accessories" isNested={ false }/>.</p>
                    </div>
                ) : (
                    <div className={ styles['cart'] }>
                        <div className={ styles['cart-header'] }>
                            <h3>Product</h3>
                            <h3>Quantity</h3>
                            <h3>Price</h3>
                            <h3>Total</h3>
                        </div>
                        <div className={ styles['divider'] }></div>
                        <div className={ styles['cart-item'] }>
                            <div className={ styles['cart-item-product'] }>
                                <img src="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt="" />
                                <div className={ styles['cart-item-product-details'] }>
                                    <div className={ styles['cart-item-product-details-info'] }>
                                        <h3>Motor Parts (Mirror)</h3>
                                        <h2>Krator Universal Black Motorcycle Mirror</h2>
                                    </div>
                                    <div className={ styles['cart-item-product-details-cta'] }>
                                        <Button
                                            type='secondary'
                                            label='View item'
                                            icon='fa-solid fa-square-up-right'
                                            iconPosition='right'
                                            action={ () => {} }
                                        />
                                        <Button
                                            type='icon'
                                            icon='fa-solid fa-trash-can'
                                            action={ () => {} }
                                            isOutlined={ true }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={ styles['cart-item-quantity'] }>
                                <InputField
                                    hint='Qty...'
                                    isSubmittable={ false }
                                    type='number'
                                />
                            </div>
                            <div className={ styles['cart-item-price'] }>
                                <h3>₱ 1,119.44</h3>
                            </div>
                            <div className={ styles['cart-item-total'] }>
                                <h3>₱ 2,238.88</h3>
                            </div>
                        </div>
                    </div>
                )}
                <div className={ styles['summary'] }>
                    <h2>Summary</h2>
                    <div className={ styles['divider'] }></div>
                    <div className={ styles['summary-wrapper'] }>
                        <div className={ styles['summary-item'] }>
                            <h3>Sub-total</h3>
                            <h3>₱ 357.99</h3>
                        </div>
                        <div className={ styles['summary-item'] }>
                            <h3>Tax</h3>
                            <h3>₱ 0.00</h3>
                        </div>
                        <div className={ styles['summary-item'] }>
                            <h3>Deductions</h3>
                            <h3>₱ 0.00</h3>
                        </div>
                        <div className={ styles['summary-item'] }>
                            <h3>Total</h3>
                            <h3>₱ 357.99</h3>
                        </div>
                    </div>
                    <div className={ styles['divider'] }></div>
                    <div className={ styles['cta'] }>
                        <Button
                            type='disabled'
                            label='Proceed to Checkout'
                            action={ () => {} }
                        />
                        <Button
                            type='primary'
                            label='Proceed to Reservation'
                            action={ () => {} }
                        />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Cart;