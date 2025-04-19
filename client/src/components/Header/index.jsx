import { Logo, Anchor, Button } from '@components';
import { Logo, Anchor, Button, Accordion } from '@components';
import styles from "./Header.module.css";
import { useNavigate } from 'react-router';
import { useTheme } from "@context/Theme";

const Header = () => {

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    
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
                        />
                        <Anchor
                            id="motorcycleDropdown"
                            label="Motorcycles"
                            dropdownOptions={[
                            isNested={ false }
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
                            dropdownOptions={[
                            isNested={ false }
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
        </>
    );
};

export default Header;
