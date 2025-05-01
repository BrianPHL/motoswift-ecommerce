import { Button, ProductCard } from '@components';
import styles from './Home.module.css';
import { useNavigate } from 'react-router';

const Home = () => {

    const featured_motorcycles = [
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
    ];
    const featured_parts = [
        {
          id: '1',
          category: 'accessories',
          subcategory: 'customization',
          img: '/Products/Accessories/Customization/motoloot_sticker-gps-warning.webp',
          label: 'Motoloot GPS Warning Sticker',
          price: '₱560.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '2',
          category: 'accessories',
          subcategory: 'customization',
          img: '/Products/Accessories/Customization/polisport_crf250fr-front-fender.webp',
          label: 'Polisport CRF250FR Front Fender',
          price: '₱1,360.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '3',
          category: 'gear',
          subcategory: 'bodywear',
          img: '/Products/Gear/Bodywear/taichi_rsj347.webp',
          label: 'Taichi RSJ347 Overlap Mesh',
          price: '₱9,080.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '4',
          category: 'maintenance',
          subcategory: 'electrical',
          img: '/Products/Maintenance/Electrical/noco_gc004.webp',
          label: 'Noco GC004 X-Connect 10-foot Extension Cable',
          price: '₱1,200.00',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
        {
          id: '5',
          category: 'parts',
          subcategory: 'body',
          img: '/Products/Parts/Body/acerbis_full-plastic-kit.webp',
          label: 'Acerbis Full Plastic Kit',
          price: '₱12,652.84',
          onReserve: () => console.log('Reserved!'),
          onCart: () => console.log('Added to cart!'),
        },
    ];
    const navigate = useNavigate();

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['hero'] }>
                <div className={ styles['hero-left'] }>
                    <h5>Home</h5>
                    <div className={ styles['hero-left-info'] }>
                        <div className={ styles['hero-left-info-text'] }>
                            <h2>Ride Beyond Limits. Own the Road Today!</h2>
                            <h3>Premium motorcycles, top-tier accessories, and hassle-free reservations – all in one place.</h3>
                        </div>
                        <div className={ styles['hero-left-info-ctas'] }>
                            <Button
                                type='primary'
                                label='Reserve Now'
                                action={ () => { navigate('/reservations') } }
                            />
                            <h5>or</h5>
                            <Button
                                id='hero-browse-inventory-1'
                                type='secondary'
                                label='Browse our Inventory'
                                options={[
                                    {
                                        label: 'Motorcycles',
                                        link: '/motorcycles'
                                    },
                                    {
                                        label: 'Parts & Accessories',
                                        link: '/parts-and-accessories'
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <div className={ styles['hero-left-footer'] }>
                        <h5>Scroll down and see what we have in store for you</h5>
                        <i className='fa-solid fa-arrow-down'></i>
                    </div>
                </div>
                <div className={ styles['hero-banner'] }></div>
            </div>
            <div className={ styles['motorcycles'] }>
                <div className={ styles['motorcycles-banner'] }></div>
                <div className={ styles['motorcycles-header'] }>
                    <div className={ styles['motorcycles-header-info'] }>
                        <h2>Top Picks for Riders</h2>
                        <div className={ styles['motorcycles-header-info-divider'] }></div>
                        <h3>Check out our most popular motorcycles, handpicked for performance and style.</h3>
                    </div>
                    <Button
                        type='primary'
                        label='Browse More Motorcycles'
                        icon='fa-solid fa-long-arrow-right'
                        iconPosition='right'
                        externalStyles={ styles['motorcycles-header-btn'] }
                        action={ () => { navigate('/motorcycles') } }
                    />
                </div>
                <div className={ styles['motorcycles-container'] }>
                    { featured_motorcycles.map((motorcycle) => (
                        <ProductCard
                            key={ motorcycle.id }
                            id={ motorcycle.id }
                            category={ motorcycle.category }
                            subcategory={ motorcycle.subcategory }
                            img={ motorcycle.img }
                            label={ motorcycle.label }
                            price={ motorcycle.price }
                            onReserve={ motorcycle.onReserve }
                            onCart={ motorcycle.onCart }
                        />
                    ))}
                </div>
            </div>
            <div className={ styles['parts'] }>
                <div className={ styles['parts-banner'] }></div>
                <div className={ styles['parts-header'] }>
                    <div className={ styles['parts-header-info'] }>
                        <h2>Essential Parts. Premium Accessories. Maximum Performance.</h2>
                        <div className={ styles['parts-header-info-divider'] }></div>
                        <h3>Because every rider deserves the best. Discover high-performance parts and stylish accessories made for the road.</h3>
                    </div>
                    <Button
                        type='primary'
                        label='Browse More Parts & Accessories'
                        icon='fa-solid fa-long-arrow-right'
                        iconPosition='right'
                        externalStyles={ styles['parts-header-btn'] }
                        action={ () => { navigate('/parts-and-accessories') } }
                    />
                </div>
                <div className={ styles['parts-container'] }>
                    { featured_parts.map((part) => (
                        <ProductCard
                            key={ part.id }
                            id={ part.id }
                            category={ part.category }
                            subcategory={ part.subcategory }
                            img={ part.img }
                            label={ part.label }
                            price={ part.price }
                            onReserve={ part.onReserve }
                            onCart={ part.onCart }
                        />
                    ))}
                </div>
            </div>
            <div className={ styles['trust'] }>
                <div className={ styles['trust-header'] }>
                    <h2>Why Riders Trust MotoSwift</h2>
                    <div className={ styles['trust-divider'] }></div>
                    <p>At MotoSwift, we go the extra mile to ensure you get the best motorcycles, parts, and accessories at unbeatable quality. Whether you're a daily commuter or a speed enthusiast, we’ve got what you need to make every ride smooth and safe.</p>
                </div>
                <div className={ styles['trust-container'] }>
                    <div className={ styles['trust-container-card'] }>
                        <i className='fa-solid fa-motorcycle'></i>
                        <div className={ styles['trust-container-card-header'] }>
                            <h2>Wide Selection of Motorcycles</h2>
                            <div className={ styles['trust-container-card-header-divider'] }></div>
                            <h3>From daily rides to high-performance bikes, we have something for every rider.</h3>
                        </div>
                        <div className={ styles['trust-container-card-details'] }>
                            <div className={ styles['trust-container-card-details-info'] }>
                                <i className='fa-solid fa-check'></i>
                                <h4>Multiple Models Available</h4>
                            </div>
                            <div className={ styles['trust-container-card-details-info'] }>
                                <i className='fa-solid fa-check'></i>
                                <h4>Trusted Local & International Brands</h4>
                            </div>
                        </div>
                    </div>
                    <div className={ styles['trust-container-card'] }>
                        <i className='fa-solid fa-wrench'></i>
                        <div className={ styles['trust-container-card-header'] }>
                            <h2>Premium Quality Parts & Accessories</h2>
                            <div className={ styles['trust-container-card-header-divider'] }></div>
                            <h3>Only the best and most reliable parts to keep your ride in top shape.</h3>
                        </div>
                        <div className={ styles['trust-container-card-details'] }>
                            <div className={ styles['trust-container-card-details-info'] }>
                                <i className='fa-solid fa-check'></i>
                                <h4>Rigorously Tested Products</h4>
                            </div>
                            <div className={ styles['trust-container-card-details-info'] }>
                                <i className='fa-solid fa-check'></i>
                                <h4>Sourced from Trusted Manufacturers</h4>
                            </div>
                        </div>
                    </div>
                    <div className={ styles['trust-container-card'] }>
                        <i className='fa-solid fa-motorcycle'></i>
                        <div className={ styles['trust-container-card-header'] }>
                            <h2>Trusted by Thousands of Riders</h2>
                            <div className={ styles['trust-container-card-header-divider'] }></div>
                            <h3>With excellent customer satisfaction, we are the go-to shop for riders across the country.</h3>
                        </div>
                        <div className={ styles['trust-container-card-details'] }>
                            <div className={ styles['trust-container-card-details-info'] }>
                                <i className='fa-solid fa-check'></i>
                                <h4>98% Positive Feedback</h4>
                            </div>
                            <div className={ styles['trust-container-card-details-info'] }>
                                <i className='fa-solid fa-check'></i>
                                <h4>5,000+ Happy Customers</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ styles['trust-ctas'] }>
                    <Button
                        type='primary'
                        label='Reserve Now'
                        action={ () => { navigate('/reservations') } }
                    />
                    <h5>or</h5>
                    <Button
                        id='hero-browse-inventory-2'
                        type='secondary'
                        label='Browse our Inventory'
                        options={[
                            {
                                label: 'Motorcycles',
                                link: '/motorcycles'
                            },
                            {
                                label: 'Parts & Accessories',
                                link: '/parts-and-accessories'
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
