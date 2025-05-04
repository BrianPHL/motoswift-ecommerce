import { useContext, useState } from "react";
import CartContext from "./context";

export const CartProvider = ({ children }) => {

    const [ cartItems, setCartItems ] = useState([]);

    const addToCart = (item) => {
        setCartItems(previous => {
            const exists = previous.find(cartItem => cartItem['product_id'] === item['product_id']);
            if (exists) {
                return previous.map(cartItem =>
                    cartItem['product_id'] === item['product_id'] ? { ...cartItem, quantity: cartItem['quantity'] + 1 } : cartItem
                );
            };
            return [...previous, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (product_id) => {
        setCartItems(previous => previous.filter(item => item['product_id'] !== product_id));
    };

    const updateQuantity = (product_id, quantity) => {

        if (quantity <= 0) {
            removeFromCart(product_id);
            return;
        }

        setCartItems(previous =>
            previous.map(item =>
                item['product_id'] === product_id ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };
    
    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
