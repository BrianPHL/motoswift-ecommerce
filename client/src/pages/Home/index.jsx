import { Button, ProductCard } from '@components';
import styles from './Home.module.css';

const Home = () => {
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
                                action={ () => {} }
                            />
                            <h5>or</h5>
                            <Button
                                id='hero-browse-inventory'
                                type='secondary'
                                label='Browse our Inventory'
                                options={[
                                    {
                                        label: 'Motorcycles',
                                        href: '/motorcycles'
                                    },
                                    {
                                        label: 'Parts & Accessories',
                                        href: '/parts-and-accessories'
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
                        action={ () => {} }
                    />
                </div>
                <div className={ styles['motorcycles-container'] }>
                    <ProductCard
                        tags={['Motor Parts', 'Mirror', 'Krator']}
                        name="Krator Universal Black Motorcycle Mirrors- Pair"
                        price="₱1,119.44"
                        description="Adjustable Mirror Angle, Up and Down, Left and Right"
                        imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />
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
                        action={ () => {} }
                    />
                </div>
                <div className={ styles['parts-container'] }>
                    <ProductCard
                        tags={['Motor Parts', 'Mirror', 'Krator']}
                        name="Krator Universal Black Motorcycle Mirrors- Pair"
                        price="₱1,119.44"
                        description="Adjustable Mirror Angle, Up and Down, Left and Right"
                        imageSrc="https://media.discordapp.net/attachments/1365762772272549988/1365762811644612752/2.jpeg?ex=680e7d3c&is=680d2bbc&hm=1b4a555b064c34f70a5bea42c2dc4f2115529f8031ba7b50e1bbc18d0ccae431&=" alt=""
                        onReserve={() => console.log('Reserved')}
                        onCart={() => console.log('Added to cart')}
                    />
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
                        action={ () => {} }
                    />
                    <h5>or</h5>
                    <Button
                        id='hero-browse-inventory'
                        type='secondary'
                        label='Browse our Inventory'
                        options={[
                            {
                                label: 'Motorcycles',
                                href: '/motorcycles'
                            },
                            {
                                label: 'Parts & Accessories',
                                href: '/parts-and-accessories'
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
