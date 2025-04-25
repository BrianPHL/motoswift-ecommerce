import { useState } from 'react';
import { Logo, Anchor, Button, Accordion } from '@components';
import styles from "./Header.module.css";
import { useNavigate } from 'react-router';
import { useTheme } from "@contexts";

/**
 * Renders the main site header.
 * Includes the Logo, navigation links (using Anchor), action buttons (Sign in, Cart, Theme toggle),
 * and handles responsive behavior by switching between a desktop layout and a mobile layout with a drawer.
 * Uses ThemeContext via useTheme hook.
 *
 * @component
 * @returns {JSX.Element} The rendered header component, containing both desktop and mobile structures.
 *
 * @example
 * <Header />
 */

const Header = () => {

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [ drawerOpen, setDrawerOpen ] = useState(false);

    return (
        <>
            <div className={ styles['desktop-header'] }>
                <div className={ styles['left'] }>
                    <Logo />
                    <Anchor
                        label="About us"
                        href="/about-us"
                    />
                </div>
                <div className={ styles['right'] }>
                    <div className={ styles['nav'] }>
                        <Anchor
                            label="Home"
                            href="/"
                            isNested={ false }
                        />
                        <Anchor
                            label="Motorcycles"
                            isNested={ false }
                        />
                        <Anchor
                            label="Parts & Accessories"
                            isNested={ false }
                        />
                    </div>
                    <Button
                        label="Sign in"
                        type="secondary"
                        action={ () => navigate('/sign-in') }
                    />
                    <Button
                        type="icon"
                        action={ () => navigate('/cart') }
                        icon="fa-solid fa-cart-shopping"
                        isOutlined={ false }
                    />
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                        isOutlined={ false }
                    />
                </div>
            </div>
            <div className={ styles['mobile-header'] }>
                <div className={ styles['left'] }>
                    <Button
                        type="icon"
                        action={ () => setDrawerOpen(true) }
                        icon="fa-solid fa-bars"
                        isOutlined={ false }
                    />
                    <Logo />
                </div>
                <div className={ styles['right'] }>
                    <Button
                        type="icon"
                        action={ () => navigate('/cart') }
                        icon="fa-solid fa-cart-shopping"
                        isOutlined={ false }
                    />
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                        isOutlined={ false }
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
                            isOutlined={ false }
                        />
                        <Logo />
                    </div>
                    <Button
                        type="icon"
                        action={ () => toggleTheme()  }
                        icon={ theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun' }
                        isOutlined={ false }
                    />
                </div>
                <nav className={ styles['mobile-nav'] }>
                    <Anchor
                        className={ styles['drawer-item'] }
                        label="Home"
                        href="/"
                        isNested={ true }
                    />
                    <Anchor
                        className={ styles['drawer-item'] }
                        label="About us"
                        href="/about-us"
                        isNested={ true }
                    />
                        label="Motorcycles"
                    />
                        label="Parts & Accessories"
                    />
                </nav>
                <div className={ styles['mobile-cta'] }>
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
