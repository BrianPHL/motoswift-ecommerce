import { Logo, Anchor, Button } from '@components';
import styles from "./Header.module.css";
import { useNavigate } from 'react-router';
import { useTheme } from "@context/Theme";

const Header = () => {

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    
    return (
        <div className={ styles.header }>
            <div className={ styles.left }>
                <Logo />
                <Anchor
                    label="About us"
                    href="/about-us"
                ></Anchor>
            </div>
            <div className={ styles.right }>
                <div className={ styles.nav }>
                    <Anchor
                        label="Home"
                        href="/"
                    ></Anchor>
                    <Anchor
                        id="motorcycleDropdown"
                        label="Motorcycles"
                        dropdownOptions={[
                            {
                                label: "Brand #1",
                                href: "#",
                            }
                        ]}
                    ></Anchor>
                    <Anchor
                        id="partsDropdown"
                        label="Parts & Accessories"
                        dropdownOptions={[
                            {
                                label: "Brand #1",
                                href: "#",
                            }
                        ]}
                    ></Anchor>
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
    )
};

export default Header;
