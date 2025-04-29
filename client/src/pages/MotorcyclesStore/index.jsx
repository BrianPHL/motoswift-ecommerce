import { useState } from 'react';
import { Button, ProductCard, TableHeader, TableFooter, ReturnButton } from '@components';
import styles from './MotorcyclesStore.module.css';

const MotorcyclesStore = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentSort, setCurrentSort ] = useState('Sort by: Price (Low to High)');
    const ITEMS_PER_PAGE = 10;
    const products = [
        {
          id: '1',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Big_Bike/honda_nx500.webp',
          label: 'Honda NX500',
          price: '₱409,000.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '2',
          category: 'motorcycles',
          subcategory: 'electrical',
          img: '/Products/Motorcycles/Electrical/honda_em1-e.webp',
          label: 'Honda EM1 e',
          price: '₱155,400.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '3',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Scooters/honda_click.webp',
          label: 'Honda Click125',
          price: '₱81,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '4',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Sports/honda_cbr150r.webp',
          label: 'Honda CBR150R',
          price: '₱183,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '5',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Underbone/honda_winner-x.webp',
          label: 'Honda Winner-X',
          price: '₱123,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '6',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Big_Bike/honda_nx500.webp',
          label: 'Honda NX500',
          price: '₱409,000.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '7',
          category: 'motorcycles',
          subcategory: 'electrical',
          img: '/Products/Motorcycles/Electrical/honda_em1-e.webp',
          label: 'Honda EM1 e',
          price: '₱155,400.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '8',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Scooters/honda_click.webp',
          label: 'Honda Click125',
          price: '₱81,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '9',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Sports/honda_cbr150r.webp',
          label: 'Honda CBR150R',
          price: '₱183,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '10',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Underbone/honda_winner-x.webp',
          label: 'Honda Winner-X',
          price: '₱123,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '12',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Big_Bike/honda_nx500.webp',
          label: 'Honda NX500',
          price: '₱409,000.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '13',
          category: 'motorcycles',
          subcategory: 'electrical',
          img: '/Products/Motorcycles/Electrical/honda_em1-e.webp',
          label: 'Honda EM1 e',
          price: '₱155,400.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '14',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Scooters/honda_click.webp',
          label: 'Honda Click125',
          price: '₱81,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '15',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Sports/honda_cbr150r.webp',
          label: 'Honda CBR150R',
          price: '₱183,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '16',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Underbone/honda_winner-x.webp',
          label: 'Honda Winner-X',
          price: '₱123,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '17',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Big_Bike/honda_nx500.webp',
          label: 'Honda NX500',
          price: '₱409,000.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '18',
          category: 'motorcycles',
          subcategory: 'electrical',
          img: '/Products/Motorcycles/Electrical/honda_em1-e.webp',
          label: 'Honda EM1 e',
          price: '₱155,400.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '19',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Scooters/honda_click.webp',
          label: 'Honda Click125',
          price: '₱81,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '20',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Sports/honda_cbr150r.webp',
          label: 'Honda CBR150R',
          price: '₱183,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '21',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Underbone/honda_winner-x.webp',
          label: 'Honda Winner-X',
          price: '₱123,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '22',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Big_Bike/honda_nx500.webp',
          label: 'Honda NX500',
          price: '₱409,000.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '23',
          category: 'motorcycles',
          subcategory: 'electrical',
          img: '/Products/Motorcycles/Electrical/honda_em1-e.webp',
          label: 'Honda EM1 e',
          price: '₱155,400.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '24',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Scooters/honda_click.webp',
          label: 'Honda Click125',
          price: '₱81,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '25',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Sports/honda_cbr150r.webp',
          label: 'Honda CBR150R',
          price: '₱183,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '26',
          category: 'motorcycles',
          subcategory: 'big-bike',
          img: '/Products/Motorcycles/Underbone/honda_winner-x.webp',
          label: 'Honda Winner-X',
          price: '₱123,900.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
    ];
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

            <h2>Find Your Perfect Ride</h2>
            <TableHeader
                tableName='motorcycles'
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

export default MotorcyclesStore;
