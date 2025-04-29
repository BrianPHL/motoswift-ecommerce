import { useContext, useState } from "react";
import CartContext from "./context";

export const CartProvider = ({ children }) => {

    const [ cartItems, setCartItems ] = useState([]);

    const addToCart = (item) => {
        setCartItems(previous => {
            const exists = previous.find(cartItem => cartItem['id'] === item['id']);
            if (exists) {
                return previous.map(cartItem =>
                    cartItem['id'] === item['id'] ? { ...cartItem, quantity: cartItem['quantity'] + 1 } : cartItem
                );
            };
            return [...previous, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(previous => previous.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(previous =>
            previous.map(item =>
                item['id'] === id ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };
    
    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
