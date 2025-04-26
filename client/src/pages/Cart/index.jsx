import { useNavigate } from 'react-router';
import { Button, Anchor } from '@components';
import styles from './Cart.module.css';

const Cart = () => {

    const navigate = useNavigate();

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
                <div className={ styles['empty'] }>
                    <h3>Your cart is empty!</h3>
                    <p>Start browsing for items in <Anchor label="Motorcycles" href="/motorcycles" isNested={ false }/> or <Anchor label="Parts & Accessories" href="/parts-and-accessories" isNested={ false }/>.</p>
                </div>
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