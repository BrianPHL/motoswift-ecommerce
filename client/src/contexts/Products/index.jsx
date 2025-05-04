import { useContext, useState, useEffect, useCallback } from "react";
import ProductsContext from "./context";
import { useToast } from '@contexts';

export const ProductsProvider = ({ children }) => {

    const REFRESH_INTERVAL = 10 * 60 * 1000;
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ lastFetched, setLastFetched ] = useState(null);
    const { showToast } = useToast();

    const fetchProducts = useCallback( async (force = false) => {

        if (loading) return;

        const minTimeBetweenFetches = 10000;

        if (force || !lastFetched || (Date.now() - lastFetched > minTimeBetweenFetches)) {
            setLoading(true);
            try {

                console.log(`Fetching products at ${new Date().toLocaleTimeString()}`);

                const response = await fetch('/api/products');

                if (!response['ok']) throw new Error('Failed to fetch products');
                
                const data = await response.json();
                console.log("Products received:", data.length || 0);
                setProducts(data);
                setLastFetched(Date.now());
                setError(null);

            } catch (err) {
                console.error("Product fetch error:", err);
                showToast(`Failed to load products: ${ err['message'] }`, 'error');
                setError(err['message']);
            } finally {
                setLoading(false);
            }

        }
    }, [ showToast ]);

    useEffect(() => {
        console.log("Running initial product fetch");
        fetchProducts(true);
    }, [ fetchProducts ]);

    useEffect(() => {
        
        console.log("Setting up product refresh interval.")
        const interval = setInterval(() => { 
            fetchProducts(false)
        }, REFRESH_INTERVAL);

        return () => {
            console.log("Clearing product refresh interval");
            clearInterval(interval);
        }
  
    }, []);

    return (
        <ProductsContext.Provider 
            value={{
                products,
                loading,
                error,
                lastFetched,
                refreshProducts: () => fetchProducts(true)
            }}
        >
            { children }
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
