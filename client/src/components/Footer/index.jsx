import { Logo, Button, InputField, Anchor } from '@components';
import { useNavigate } from 'react-router';
import styles from './Footer.module.css';

/**
 * Renders the site footer section.
 * Includes quick links, company info, legal links (using Anchor), a newsletter signup (using InputField),
 * social media links (using Button), copyright info, and the Logo.
 * Layout adjusts responsively based on screen size via CSS media queries.
 *
 * @component
 * @returns {JSX.Element} The rendered footer element.
 *
 * @example
 * <Footer />
 */

const Footer = () => {

    const navigate = useNavigate();

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['top'] }>
                <div className={ styles['top-left'] }>
                    <div className={ styles['top-left-links'] }>
                        <h3>Quick Links</h3>
                        <nav>
                            <Anchor
                                label="Home"
                                href="/"
                                isNested={ false }
                            />
                            <Anchor
                                label="Motorcycles"
                                href="/motorcycles"
                                isNested={ false }
                            />
                            <Anchor
                                label="Parts & Accessories"
                                href="/parts-and-accessories"
                                isNested={ false }
                            />
                            <Anchor
                                label="My Account"
                                href="/my-account"
                                isNested={ false }
                            />
                        </nav>
                    </div>
                    <div className={ styles['top-left-links'] }>
                        <h3>Company</h3>
                        <nav>
                            <Anchor
                                label="About us"
                                href="/about-us"
                                isNested={ false }
                            />
                            <Anchor
                                label="contact@motoswift.com"
                                href="#"
                                isNested={ false }
                            />
                        </nav>
                    </div>
                    <div className={ styles['top-left-links'] }>
                        <h3>Legal</h3>
                        <nav>
                            <Anchor
                                label="Terms & Conditions"
                                href="/terms-and-conditions"
                                isNested={ false }
                            />
                            <Anchor
                                label="Privacy Policy"
                                href="privacy-policy"
                                isNested={ false }
                            />
                        </nav>
                    </div>    
                </div>
                <div className={ styles['top-right'] }>
                    <div className={ styles['newsletter'] }>
                        <div className={ styles['newsletter-header'] }>
                            <h2>Stay Updated</h2>
                            <h3>Get the latest MotoSwift updates delivered to your inbox.</h3>
                        </div>
                        <InputField hint="Your email address..." icon="fa-solid fa-paper-plane" />
                    </div>
                    <div className={ styles['socials'] }>
                        <Button
                            type='icon'
                            icon='fa-brands fa-facebook'
                            action={ () => { window.location.href = "https://www.facebook.com" } }
                            isOutlined={ true }
                        />
                        <Button
                            type='icon'
                            icon='fa-brands fa-x-twitter'
                            action={ () => { window.location.href = "https://www.facebook.com" } }
                            isOutlined={ true }
                        />
                        <Button
                            type='icon'
                            icon='fa-brands fa-instagram'
                            action={ () => { window.location.href = "https://www.facebook.com" } }
                            isOutlined={ true }
                        />
                    </div>
                </div>
            </div>
            <span className={ styles['divider'] } />
            <div className={ styles['bottom'] }>
                <div className={ styles['bottom-left'] }>
                    <h5>© 2025 MotoSwift. All rights reserved.</h5>
                    <h5>Crafted by hand using <span className={ styles['link'] } onClick={ () => { window.location.href = "https://www.figma.com" } }>Figma</span> & <span className={ styles['link'] } onClick={ () => { window.location.href = "https://www.react.dev" } }>React.js</span>.</h5>
                </div>
                <div className={ styles['bottom-right'] }>
                    <Logo />  
                    <h3>Your Trusted Motorcycle Shop - Ride Fast, Ride Smart.</h3>
                </div>
            </div>
        </div>  
    );
}

export default Footer;