import { useState } from 'react';
import { Logo, Anchor, Button, Accordion } from '@components';
import styles from "./Header.module.css";
import { useNavigate, useLocation } from 'react-router';
import { useTheme, useAuth } from "@contexts";

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const { theme, toggleTheme } = useTheme();
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const { user, logout } = useAuth();

    return (
        <>
            <div className={ styles['desktop-header'] }>
                <div className={ styles['left'] }>
                    <Logo />
                    <Anchor
                        label="About us"
                        link="/about-us"
                        isNested={ false }
                        isActive={ pathname === '/about-us' }
                    />
                </div>
                <div className={ styles['right'] }>
                    <div className={ styles['nav'] }>
                        <Anchor
                            label="Home"
                            link="/"
                            isNested={ false }
                            isActive={ pathname === '/' }
                        />
                        <Anchor
                            label="Motorcycles"
                            link="/motorcycles"
                            isNested={ false }
                            isActive={ pathname === '/motorcycles' }
                        />
                        <Anchor
                            label="Parts & Accessories"
                            link="/parts-and-accessories"
                            isNested={ false }
                            isActive={ pathname === '/parts-and-accessories' }
                        />
                    </div>
                    { user ? (
                        <Button
                            id='account-dropdown'
                            type='secondary'
                            label={ user.name }
                            options={[
                                {
                                    label: 'Profile',
                                    link: '/profile'
                                },
                                {
                                    label: 'Cart',
                                    link: '/cart'
                                },
                                {
                                    label: 'Reservations',
                                    link: '/reservations'
                                }
                            ]}
                        />
                    ) : (
                        <Button
                            type='secondary'
                            label='Sign in'
                            action={ () => { navigate('/sign-in') } }
                        />
                    )}
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                        
                    />
                </div>
            </div>
            <div className={ styles['mobile-header'] }>
                <div className={ styles['left'] }>
                    <Button
                        type="icon"
                        action={ () => setDrawerOpen(true) }
                        icon="fa-solid fa-bars"
                        
                    />
                    <Logo />
                </div>
                <div className={ styles['right'] }>
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                    />
                </div>
            </div>
            <div className={ `${ styles['drawer'] } ${ drawerOpen ? styles['drawer-open'] : '' }` }>
                <div className={ styles['drawer-header'] }>
                    <div className={ styles['left'] }>
                        <Button
                            type="icon"
                            action={ () => setDrawerOpen(false) }
                            icon="fa-solid fa-close"
                            
                        />
                        <Logo />
                    </div>
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                        
                    />
                </div>
                <nav className={ styles['mobile-nav'] }>
                    <Anchor
                        label="Home"
                        link="/"
                        isNested={ true }
                        isActive={ pathname === '/' }
                    />
                    <Anchor
                        label="About us"
                        link="/about-us"
                        isNested={ true }
                        isActive={ pathname === '/about-us' }
                    />
                    <Anchor
                        label="Motorcycles"
                        link="/motorcycles"
                        isNested={ true }
                        isActive={ pathname === '/motorcycles' }
                    />
                    <Anchor
                        label="Parts & Accessories"
                        link="/parts-and-accessories"
                        isNested={ true }
                        isActive={ pathname === '/parts-and-accessories' }
                    />
                    <Accordion
                        label='My account'
                        type='link'
                        options={[
                            {
                                label: 'My Profile',
                                link: '#'
                            },
                            {
                                label: 'My Reservation',
                                link: '#'
                            },
                            {
                                label: 'My Cart',
                                link: '#'
                            },
                        ]}
                    />
                </nav>
                <div className={ styles['mobile-cta'] }>
                    { user ? (
                        <Button
                            id='account-dropdown-1'
                            type='secondary'
                            label={ user.name }
                            options={[
                                {
                                    label: 'Profile',
                                    link: '/profile'
                                },
                                {
                                    label: 'Cart',
                                    link: '/cart'
                                },
                                {
                                    label: 'Reservations',
                                    link: '/reservations'
                                }
                            ]}
                        />
                    ) : (
                        <>
                            <Button
                                type='primary'
                                label='Sign up'
                                action={ () => { navigate('/sign-up') } }
                            />                        
                            <Button
                                type='secondary'
                                label='Sign in'
                                action={ () => { navigate('/sign-in') } }
                            />
                        </>
                    )}
                    <Button
                        label="Sign in"
                        type="primary"
                        action={() => {
                            setDrawerOpen(false);
                            navigate('/sign-in');
                        }}
                    />
                    <Button
                        label="Sign up"
                        type="secondary"
                        action={() => {
                            setDrawerOpen(false);
                            navigate('/sign-up');
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Header;
