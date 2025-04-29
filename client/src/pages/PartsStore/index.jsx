import { useState } from 'react';
import { Button, ProductCard, TableHeader, TableFooter, ReturnButton } from '@components';
import styles from './PartsStore.module.css';

const PartsStore = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentSort, setCurrentSort ] = useState('Sort by: Price (Low to High)');
    const ITEMS_PER_PAGE = 10;
    const products = [];
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const getSortedProducts = (products, sortKey) => {
      switch (sortKey) {
        case 'Sort by: Price (Low to High)':
            return [...products].sort((a, b) =>
                Number(a.price.replace(/[^\d]/g, '')) - Number(b.price.replace(/[^\d]/g, ''))
            );
        case 'Sort by: Price (High to Low)':
            return [...products].sort((a, b) =>
                Number(b.price.replace(/[^\d]/g, '')) - Number(a.price.replace(/[^\d]/g, ''))
            );
        case 'Name: A-Z':
            return [...products].sort((a, b) => a.label.localeCompare(b.label));
        case 'Name: Z-A':
            return [...products].sort((a, b) => b.label.localeCompare(a.label));
        default:
            return products;
      };
    };
    const sortedProducts = getSortedProducts(products, currentSort);
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };
    const handleSortChange = (sort) => {
        setCurrentSort(sort);
        setCurrentPage(1);
    };
    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <span className={styles['pagewrap']}>
                <ReturnButton />
            </span>
            <h2>Find The Perfect Parts For Your Perfect Ride</h2>
            <TableHeader
                tableName='parts-and-accessories'
                currentPage={ currentPage }
                totalPages={ totalPages }
                resultsLabel={ `Showing ${ paginatedProducts.length } out of ${ products.length } results` }
                sortLabel={ currentSort }
                onPageChange={ handlePageChange }
                onSortChange={ handleSortChange }
            />
            
            <div className={styles['container']}>
                { paginatedProducts.map(product => (
                    <ProductCard
                        key={ product.id }
                        id={ product.id }
                        category={ product.category }
                        subcategory={ product.subcategory }
                        img={ product.img }
                        label={ product.label }
                        price={ product.price }
                        onReserve={ product.onReserve }
                        onCart={ product.onCart }
                    />
                ))}
            </div>

        <TableFooter
            currentPage={ currentPage }
            totalPages={ totalPages }
            resultsLabel={ `Showing ${ paginatedProducts.length } out of ${ products.length } results` }
            sortLabel={ currentSort }
            onPageChange={ handlePageChange }
        />

        </div>
    );
};

export default PartsStore;
