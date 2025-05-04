import { useContext, useState, useEffect } from "react";
import CartContext from "./context";
import { useAuth, useToast } from "@contexts";

export const CartProvider = ({ children }) => {

    const [ cartItems, setCartItems ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const { user } = useAuth();
    const { showToast } = useToast();

    const fetchCartItems = async () => {
        
        if (!user) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/carts/${ user['account_id'] }`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();

            setCartItems(data || []);

        } catch (err) {
            console.error("Failed to fetch cart items:", err);
            showToast(`Failed to load your cart: ${ err } `, "error");
        } finally {
            setLoading(false);
        }

    };

    const addToCart = async (item) => {

        if (!user) return;

        try {

            setCartItems(previous => {
                const exists = previous.find(cartItem => cartItem['product_id'] === item['product_id']);
                if (exists) {
                    return previous.map(cartItem =>
                        cartItem['product_id'] === item['product_id'] ? { ...cartItem, quantity: cartItem['quantity'] + 1 } : cartItem
                    );
                };
                return [...previous, { ...item, quantity: 1 }];
            });

            await fetch('/api/carts/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account_id: user['account_id'],
                    product_id: item['product_id'],
                    quantity: item['quantity']
                })
            });

        } catch (err) {
            console.error("Failed to add item to cart:", error);
            showToast("Failed to add item to cart", "error");
            fetchCartItems();
        } finally {
            setLoading(false);
        }
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

    useEffect(() => {
        if (user?.account_id) fetchCartItems();
    }, [ user ])
    
    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
