import React, { useState } from 'react';
import styles from './Cart.module.css';

const Cart = () => {
    // Sample cart items
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', pricePerItem: 10, quantity: 2, image: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Product 2', pricePerItem: 20, quantity: 1, image: 'https://via.placeholder.com/50' },
    ]);

    // Update quantity of the cart item
    const updateQuantity = (id, quantity) => {
        const newCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Number(quantity) } : item
        );
        setCartItems(newCartItems);
    };

    // Remove item from the cart
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div className={styles['wrapper']}>
            <h1>Your Cart</h1>

            {/* Table for Cart Items */}
            <table className={styles['cart-table']}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.name} className={styles['product-image']} />
                            </td>
                            <td>{item.name}</td>
                            <td>₱{item.pricePerItem * item.quantity}</td> {/* Updated price calculation */}
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                    className={styles['quantity-input']}
                                />
                            </td>
                            <td>
                                <button
                                    className={styles['remove-button']}
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Price */}
            <div className={styles['total']}>
                <h2>
                    Total: ₱{cartItems.reduce((total, item) => total + item.pricePerItem * item.quantity, 0)}
                </h2>
            </div>

            {/* Checkout Button */}
            <button className={styles['checkout-button']}>Proceed to Reservation Room</button>
        </div>
    );
};

export default Cart;