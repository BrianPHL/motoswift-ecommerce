import { useEffect, useState } from 'react';
import { Button, ProductCard, Carousel } from '@components';
import styles from './Home.module.css';
import { useNavigate } from 'react-router';
import { useProducts } from '@contexts';

const Home = () => {

    const navigate = useNavigate();
    const { products, loading } = useProducts();
    const [ featuredMotorcycles, setFeaturedMotorcycles ] = useState([]);
    const [ featuredPartsAndAccessories, setfeaturedPartsAndAccessories ] = useState([]);

    // * Fisher-Yates Shuffle Algorithm
    // * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    const shuffleArray = (array) => {
        
        const shuffled = [ ...array ];
        
        for (let i = shuffled['length'] - 1; i > 0; i--) {
            const j = Math['floor'](Math['random']() * (i + 1));
            [ shuffled[i],  shuffled[j] ] = [ shuffled[j], shuffled[i] ];
        };
        return shuffled;

    }

    useEffect(() => {

        if (products && products['length'] > 0) {

            const motorcycles = products['filter'](product => product['category'] === 'Motorcycles');
            const randomMotorcycles = shuffleArray(motorcycles)['slice'](0, 5);
            const partsAndAccessories = products['filter'](product => product['category'] !== 'Motorcycles');
            const randomPartsAndAccessories = shuffleArray(partsAndAccessories)['slice'](0, 5);

            setFeaturedMotorcycles(randomMotorcycles);
            setfeaturedPartsAndAccessories(randomPartsAndAccessories);

        }

    }, [ products ]);

    return (
        <div className={ styles['wrapper'] }>
            <Carousel>
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
                    <div className={` ${ styles['hero-banner'] } ${ styles['hero-banner-first'] } `}></div>
                </div>
                <div className={ styles['hero'] }>
                    <div className={ styles['hero-left'] }>
                        <h5>Parts & Accessories</h5>
                        <div className={ styles['hero-left-info'] }>
                            <div className={ styles['hero-left-info-text'] }>
                                <h2>Upgrade Your Ride With Premium Parts</h2>
                                <h3>Discover high-performance components and stylish accessories that enhance both form and function.</h3>
                            </div>
                            <div className={ styles['hero-left-info-ctas'] }>
                                <Button
                                    type='primary'
                                    label='Shop Parts Now'
                                    action={ () => { navigate('/parts-and-accessories') } }
                                />
                                <h5>or</h5>
                                <Button
                                    id='hero-browse-inventory-2'
                                    type='secondary'
                                    label='View Top Categories'
                                    options={[
                                        {
                                            label: 'Engine Components',
                                            link: '/parts-and-accessories'
                                        },
                                        {
                                            label: 'Safety Gear',
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
                    <div className={` ${ styles['hero-banner'] } ${ styles['hero-banner-second'] } `}></div>
                </div>
                <div className={ styles['hero'] }>
                    <div className={ styles['hero-left'] }>
                        <h5>Customer Experience</h5>
                        <div className={ styles['hero-left-info'] }>
                            <div className={ styles['hero-left-info-text'] }>
                                <h2>Trusted By 5,000+ Riders Nationwide</h2>
                                <h3>Join thousands of satisfied customers who count on MotoSwift for quality products and exceptional service.</h3>
                            </div>
                            <div className={ styles['hero-left-info-ctas'] }>
                                <Button
                                    type='primary'
                                    label='See Customer Stories'
                                    action={ () => { navigate('/about-us') } }
                                />
                                <h5>or</h5>
                                <Button
                                    id='hero-browse-inventory-3'
                                    type='secondary'
                                    label='Popular Choices'
                                    options={[
                                        {
                                            label: 'Best Sellers',
                                            link: '/motorcycles'
                                        },
                                        {
                                            label: 'New Arrivals',
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
                    <div className={` ${ styles['hero-banner'] } ${ styles['hero-banner-third'] } `}></div>
                </div>
            </Carousel>
            <div className={ styles['motorcycles'] }>
                <div className={ styles['motorcycles-banner'] }></div>
                <div className={ styles['motorcycles-header'] }>
                    <div className={ styles['motorcycles-header-info'] }>
                        <h2>Top Picks for Riders</h2>
                        <div className={ styles['highlight-divider'] }></div>
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
                    { featuredMotorcycles.map((motorcycle) => (
                        <ProductCard
                            key={ motorcycle['product_id'] }
                            product_id={ motorcycle['product_id'] }
                            category={ motorcycle['category'] }
                            subcategory={ motorcycle['subcategory'] }
                            image_url={ motorcycle['image_url'] }
                            label={ motorcycle['label'] }
                            price={ motorcycle['price'] }
                            stock_quantity={ motorcycle['stock_quantity'] }
                        />
                    ))}
                </div>
            </div>
            <div className={ styles['parts'] }>
                <div className={ styles['parts-banner'] }></div>
                <div className={ styles['parts-header'] }>
                    <div className={ styles['parts-header-info'] }>
                        <h2>Essential Parts. Premium Accessories. Maximum Performance.</h2>
                        <div className={ styles['highlight-divider'] }></div>
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
                    { featuredPartsAndAccessories.map((partsAndAccessories) => (
                        <ProductCard
                            key={ partsAndAccessories['product_id'] }
                            product_id={ partsAndAccessories['product_id'] }
                            category={ partsAndAccessories['category'] }
                            subcategory={ partsAndAccessories['subcategory'] }
                            image_url={ partsAndAccessories['image_url'] }
                            label={ partsAndAccessories['label'] }
                            price={ partsAndAccessories['price'] }
                            stock_quantity={ partsAndAccessories['stock_quantity'] }
                        />
                    ))}
                </div>
            </div>
            <div className={ styles['trust'] }>
                <div className={ styles['trust-header'] }>
                    <h2>Why Riders Trust MotoSwift</h2>
                    <div className={ styles['highlight-divider'] }></div>
                    <p>At MotoSwift, we go the extra mile to ensure you get the best motorcycles, parts, and accessories at unbeatable quality. Whether you're a daily commuter or a speed enthusiast, we’ve got what you need to make every ride smooth and safe.</p>
                </div>
                <div className={ styles['trust-container'] }>
                    <div className={ styles['trust-container-card'] }>
                        <i className='fa-solid fa-motorcycle'></i>
                        <div className={ styles['trust-container-card-header'] }>
                            <h2>Wide Selection of Motorcycles</h2>
                            <div className={ styles['highlight-divider'] }></div>
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
                            <div className={ styles['highlight-divider'] }></div>
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
                            <div className={ styles['highlight-divider'] }></div>
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
                        id='hero-browse-inventory-4'
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
