import { useContext, useState, useEffect, useCallback } from "react";
import ProductsContext from "./context";
import { useToast } from '@contexts';

export const ProductsProvider = ({ children }) => {

    const REFRESH_INTERVAL = 5 * 60 * 1000;
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ lastFetched, setLastFetched ] = useState(null);
    const { showToast } = useToast();

    const fetchProducts = useCallback( async (force = false) => {
        if (force || !lastFetched || (Date.now() - lastFetched > REFRESH_INTERVAL)) {
            setLoading(true);
            try {

                const response = await fetch('/api/products');

                if (!response['ok']) throw new Error('Failed to fetch products');
                
                const data = await response['json']();
                setProducts(data);
                setLastFetched(Date['now']());
                setError(null);

            } catch (err) {
                showToast(`Failed to load products: ${ err['message'] }`, 'error');
                setError(err['message']);
            } finally {
                setLoading(false);
            }

        }
    }, [ lastFetched, showToast, REFRESH_INTERVAL ]);

    useEffect(() => {
        fetchProducts(true);
    }, [ fetchProducts ]);

    useEffect(() => {
        const interval = setInterval(() => fetchProducts(), REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [ fetchProducts, REFRESH_INTERVAL ]);

    return (
        <ProductsContext.Provider 
            value={{
                products,
                loading,
                error,
                refreshProducts: () => fetchProducts(true)
            }}
        >
            { children }
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
