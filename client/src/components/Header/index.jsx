import { useState } from 'react';
import { Logo, Anchor, Button, Accordion } from '@components';
import styles from "./Header.module.css";
import { useNavigate } from 'react-router';
import { useTheme } from "@context/Theme";

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
                            id="motorcycleDropdown"
                            label="Motorcycles"
                            isNested={ false }
                            options={[
                                {
                                    label: "Brand #1",
                                    href: "#",
                                },
                                {
                                    label: "Brand #2",
                                    href: "#",
                                },
                                {
                                    label: "Brand #3",
                                    href: "#",
                                }
                            ]}
                        />
                        <Anchor
                            id="partsDropdown"
                            label="Parts & Accessories"
                            isNested={ false }
                            options={[
                                {
                                    label: "Brand #1",
                                    href: "#",
                                },
                                {
                                    label: "Brand #2",
                                    href: "#",
                                },
                                {
                                    label: "Brand #3",
                                    href: "#",
                                }
                            ]}
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
                    />
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
                        action={ () => navigate('/cart') }
                        icon="fa-solid fa-cart-shopping"
                    />
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
                        <Accordion
                            className={ styles['drawer-item'] }
                            label="Motorcycles"
                            type="href"
                            options={[
                                {
                                    label: "Brand #1",
                                    href: "/"
                                },
                                {
                                    label: "Brand #2",
                                    href: "/"
                                },
                                {
                                    label: "Brand #3",
                                    href: "/"
                                }
                            ]}
                        />
                        <Accordion
                            className={ styles['drawer-item'] }
                            label="Parts & Accessories"
                            type="href"
                            options={[
                                {
                                    label: "Brand #1",
                                    href: "/"
                                },
                                {
                                    label: "Brand #2",
                                    href: "/"
                                },
                                {
                                    label: "Brand #3",
                                    href: "/"
                                }
                            ]}
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
