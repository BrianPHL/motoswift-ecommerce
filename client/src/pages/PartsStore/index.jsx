import { useState } from 'react';
import { Button, ProductCard, TableHeader, TableFooter, ReturnButton } from '@components';
import styles from './PartsStore.module.css';

const PartsStore = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentSort, setCurrentSort ] = useState('Sort by: Price (Low to High)');
    const ITEMS_PER_PAGE = 10;
    const products = [
        {
            id: '1',
            category: 'accessories',
            subcategory: 'customization',
            img: '/Products/Accessories/Customization/motoloot_sticker-gps-warning.webp',
            label: 'Motorcycle Sticker - GPS warning (2 pack)',
            price: '₱560',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '2',
            category: 'accessories',
            subcategory: 'dashcam',
            img: '/Products/Accessories/Dashcam/garmin_67w.webp',
            label: 'Garmin Dash Cam 67W',
            price: '₱14504',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '3',
            category: 'Accessories',
            subcategory: 'ergonomics',
            img: '/Products/Accessories/Ergonomics/wild-ass_seat-pad.webp',
            label: 'Wild Ass Sport Air Gel Motorcycle Seat Pad',
            price: '₱3850',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '4',
            category: 'Accessories',
            subcategory: 'intercom',
            img: '/Products/Accessories/Intercom/nolan_n-com.webp',
            label: 'NOLAN N-COM BLUETOOTH INTERCOM w/ MESH FOR X-LITE SERIES',
            price: '₱16990',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '5',
            category: 'Accessories',
            subcategory: 'storage',
            img: '/Products/Accessories/Storage/givi_matterhorn.webp',
            label: 'GIVI MATTERHORN MOTORCYCLE MONOLOCK TOPCASE',
            price: '₱7490',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '6',
            category: 'gear',
            subcategory: 'bodywear',
            img: '/Products/Gear/Bodywear/dainese_ignite.webp',
            label: 'DAINESE HYDRAFLUX 2 AIR DRY MOTORCYCLE JACKET',
            price: '₱17990',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '7',
            category: 'gear',
            subcategory: 'footwear',
            img: '/Products/Gear/Footwear/oneal_rsx.webp',
            label: 'ONEAL RSX OFFROAD MX BOOTS',
            price: '₱8990',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '8',
            category: 'gear',
            subcategory: 'gloves',
            img: '/Products/Gear/Gloves/komine_gk-2493.webp',
            label: 'KOMINE GK-2493 PROTECT VINTAGE MOTORCYCLE MESH GLOVES',
            price: '₱1990',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '9',
            category: 'gear',
            subcategory: 'helmet',
            img: '/Products/Gear/Helmet/ls2_ff353.webp',
            label: 'LS2 FF805C CARBON THUNDER GP PRO - FIM HELMET',
            price: '₱25990',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '10',
            category: 'gear',
            subcategory: 'protection',
            img: '/Products/Gear/Protection/evs_sx01.webp',
            label: 'EVS SX01 KNEE BRACE',
            price: '₱2960',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '11',
            category: 'maintenance',
            subcategory: 'cleaning',
            img: '/Products/Maintenance/Cleaning/oxford_chain-brush.webp',
            label: 'OXFORD CHAIN BRUSH',
            price: '₱490',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '12',
            category: 'maintenance',
            subcategory: 'electrical',
            img: '/Products/Maintenance/Electrical/noco_gc004.webp',
            label: 'NOCO GC004 X-CONNECT 10 FOOT EXTENSION CABLE',
            price: '₱1200',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '13',
            category: 'maintenance',
            subcategory: 'engine_care',
            img: '/Products/Maintenance/Engine_Care/ipone_full-power.webp',
            label: 'IPONE FULL POWER KATANA MOTORCYCLE ENGINE OIL',
            price: '₱890',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '14',
            category: 'maintenance',
            subcategory: 'fluids',
            img: '/Products/Maintenance/Fluids/oxford_oc204.webp',
            label: 'OXFORD OC204 MINT GENERAL PROTECTANT (500ML)',
            price: '₱380',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '15',
            category: 'maintenance',
            subcategory: 'tools',
            img: '/Products/Maintenance/Tools/oxford_biker-toolkit.webp',
            label: 'BIRZMAN FEEXTUBE TIRE PATCH KIT',
            price: '₱300',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '16',
            category: 'parts',
            subcategory: 'body',
            img: '/Products/Parts/Body/acerbis_full-plastic-kit.webp',
            label: 'Acerbis Full Plastic Kit',
            price: '₱12652',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '17',
            category: 'parts',
            subcategory: 'brakes',
            img: '/Products/Parts/Brakes/brembo_19rcs.webp',
            label: 'Brembo 19RCS Brake Master Cylinder',
            price: '₱8680',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '18',
            category: 'parts',
            subcategory: 'electrical',
            img: '/Products/Parts/Electrical/baja_lp6.webp',
            label: 'Baja Designs LP6 Pro 6" LED Auxiliary Light Pod',
            price: '₱21571',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '19',
            category: 'parts',
            subcategory: 'mirror',
            img: '/Products/Parts/Mirror/krator_chrome-skeleton-hand-motorcycle-mirrors.webp',
            label: 'Krator Chrome/Black Skeleton Hand Motorcycle Mirrors Compatible with Honda CB 125 350 400 450 650 750 900 Super Sport',
            price: '₱2799',
            onReserve: () => console.log('Reserved!'),
            onCart: () => console.log('Added to cart!'),
        },

        {
            id: '20',
            category: 'parts',
            subcategory: 'tires',
            img: '/Products/Parts/Tires/metzeler_karoo-4.webp',
            label: 'Metzeler Karoo 4 Tire for Adventure Bikes and Maxi Enduro',
            price: '₱7990',
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
