import { useState } from 'react';
import { Logo, Anchor, Button, Accordion, Modal } from '@components';
import styles from "./Header.module.css";
import { useNavigate, useLocation } from 'react-router';
import { useTheme, useAuth } from "@contexts";

const Header = () => {

    const [ modalOpen, setModalOpen ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const { theme, toggleTheme } = useTheme();
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const { user, logout } = useAuth();
    const handleLogout = () => setModalOpen(true);

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
                            label={ user['first_name'] }
                            options={[
                                {
                                    label: 'Profile',
                                    action: () => { navigate('/profile') },
                                },
                                {
                                    label: 'Cart',
                                    action: () => { navigate('/cart') },
                                },
                                {
                                    label: 'Reservations',
                                    action: () => { navigate('/reservations') },
                                },
                                {
                                    label: 'Logout',
                                    action: handleLogout,
                                },
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
                        <div onClick={ () => setDrawerOpen(false) }>
                            <Logo/>
                        </div>
                    </div>
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                        
                    />
                </div>
                <nav className={ styles['mobile-nav'] }>
                    <span style={{ display: 'contents' }} onClick={ () => setDrawerOpen(false) }>
                        <Anchor
                            label="Home"
                            link="/"
                            isNested={ true }
                            isActive={ pathname === '/' }
                            externalStyles={ styles['mobile-nav-anchor'] }
                        />
                    </span>
                    <span style={{ display: 'contents' }} onClick={ () => setDrawerOpen(false) }>
                        <Anchor
                            label="About us"
                            link="/about-us"
                            isNested={ true }
                            isActive={ pathname === '/about-us' }
                            externalStyles={ styles['mobile-nav-anchor'] }
                        />
                    </span>
                    <span style={{ display: 'contents' }} onClick={ () => setDrawerOpen(false) }>
                        <Anchor
                            label="Motorcycles"
                            link="/motorcycles"
                            isNested={ true }
                            isActive={ pathname === '/motorcycles' }
                            externalStyles={ styles['mobile-nav-anchor'] }
                        />
                    </span>
                    <span style={{ display: 'contents' }} onClick={ () => setDrawerOpen(false) }>
                        <Anchor
                            label="Parts & Accessories"
                            link="/parts-and-accessories"
                            isNested={ true }
                            isActive={ pathname === '/parts-and-accessories' }
                            externalStyles={ styles['mobile-nav-anchor'] }
                        />
                    </span>
                    { user ? (
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
                    ) : null}
                </nav>
                <div className={ styles['mobile-cta'] }>
                    { user ? (
                        <div className={ styles['profile-display'] }>
                            <h3>{ user['first_name'] } </h3>
                            <Button
                                type='icon'
                                icon='fa-solid fa-right-from-bracket'
                                action={ () => {
                                        handleLogout()
                                        setDrawerOpen(false)
                                    }
                                }
                            />
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
            <Modal label='Logout Confirmation' isOpen={ modalOpen } onClose={ () => setModalOpen(false) }>
                <p className={ styles['modal-info'] }>Are you sure you want to log out of your account?</p>
                <div className={ styles['modal-ctas'] }>
                    <Button
                        label='Confirm'
                        type='primary'
                        action={ () => {
                            setModalOpen(false);
                            logout();
                        } }
                        externalStyles={ styles['modal-confirm'] }
                    />
                    <Button
                        label='Cancel'
                        type='secondary'
                        action={ () => { logout } }
                    />
                </div>
            </Modal>
        </>
    );
};

export default Header;
