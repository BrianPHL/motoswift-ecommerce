 import { Button, ProductCard, TableHeader, TableFooter, ReturnButton } from '@components';
import { useProducts } from '@contexts';
import { useProductFilter, usePagination } from '@hooks';
import styles from './Store.module.css';

const Store = () => {
    const { products, loading, error, refreshProducts } = useProducts();
    const ITEMS_PER_PAGE = 10;
    const {
        sortedProducts,
        categoryProducts,
        currentSort,
        searchQuery,
        searchInput,
        handleSortChange: onSortChange,
        handleSearchChange,
        handleSearchSubmit,
        setSearchInput,
        setSearchQuery
    } = useProductFilter(products, 'Parts-And-Accessories');
    const {
        currentPage,
        totalPages,
        currentItems: paginatedProducts,
        handlePageChange,
        resetPagination
    } = usePagination(sortedProducts, ITEMS_PER_PAGE);

    const handleSortChange = (sort) => {
        onSortChange(sort);
        resetPagination();
    };

    const handleSearch = () => {
        handleSearchSubmit();
        resetPagination();
    };
    
    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <span className={ styles['pagewrap'] }>
                <ReturnButton />
            </span>
            
            <h2>Find The Perfect Parts For Your Perfect Ride</h2>
            
            <TableHeader
                tableName='motorcycles'
                currentPage={ currentPage }
                totalPages={ totalPages }
                resultsLabel={ `Showing ${ paginatedProducts['length'] } out of ${ categoryProducts['length'] } results` }
                sortLabel={ currentSort }
                searchValue={ searchInput }
                onPageChange={ handlePageChange }
                onSortChange={ handleSortChange }
                onSearchChange={ handleSearchChange }
                onSearchSubmit={ handleSearch }
            />

            <div className={ styles['container'] }>
                { paginatedProducts['length'] === 0 ? (
                    <div className={ styles['empty'] }>
                        <h3>No products found matching "{ searchQuery }"</h3>
                        <Button 
                            type="secondary" 
                            label="Clear Search" 
                            action={() => {
                                setSearchInput('');
                                setSearchQuery('');
                                resetPagination();
                            }}
                        />
                    </div>
                ) : (
                    <>
                        { paginatedProducts.map(product => (
                            <ProductCard
                                key={ product['product_id'] }
                                product_id={ product['product_id'] }
                                category={ product['category'] }
                                subcategory={ product['subcategory'] }
                                image_url={ product['image_url'] }
                                label={ product['label'] }
                                price={ product['price'] }
                            />
                        ))}
                    </>
                )}
            </div>

            <TableFooter
                currentPage={ currentPage }
                totalPages={ totalPages }
                resultsLabel={ `Showing ${ paginatedProducts['length'] } out of ${ categoryProducts['length'] } results` }
                sortLabel={ currentSort }
                onPageChange={ handlePageChange }
            />
        </div>
    );
};

export default Store;
