import { Button, ReturnButton } from '@components';
import styles from './AboutUs.module.css';

const AboutUs = () => {

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <div className={ styles['header'] }>
                <ReturnButton />
                <h1>About MotoSwift</h1>
            </div>
            <div className={ styles['about'] }>
                <section className={ styles['info-section'] }>
                    <h2>Driven by Passion, Fueled by Performance</h2>
                    <div className={ styles['divider'] }></div>
                    <p>At MotoSwift, we believe that every ride should be smooth, reliable, and exhilarating. Whether you're a daily commuter, a weekend adventurer, or a speed enthusiast, our mission is to provide you with top-quality motorcycles, parts, and accessories to enhance your riding experience.</p>
                </section>
                <section className={ styles['info-section'] }>
                    <h2>Who We Are</h2>
                    <div className={ styles['divider'] }></div>
                    <p>Founded with a passion for motorcycles and a commitment to excellence, MotoSwift has grown into a trusted name in the industry. We cater to riders of all skill levels, offering a wide selection of motorcycles and premium-grade parts to ensure that your ride performs at its best.</p>
                </section>
                <section className={ styles['info-section'] }>
                    <h2>Our Mission</h2>
                    <div className={ styles['divider'] }></div>
                    <p>We aim to bridge the gap between riders and the best motorcycle products available. At MotoSwift, we don’t just sell motorcycles—we build connections, foster a community of passionate riders, and ensure that every product meets the highest standards of quality and performance.</p>
                </section>
                <section className={ styles['info-section'] }>
                    <h2>Our Vision</h2>
                    <div className={ styles['divider'] }></div>
                    <p>At MotoSwift, we envision a world where every rider has access to high-quality motorcycles and accessories, ensuring safer, more enjoyable journeys. Our goal is to become the leading hub for motorcycle enthusiasts, setting the standard for reliability, innovation, and customer satisfaction.</p>
                </section>
            </div>
            <div className={ styles['meet-the-team'] }>
                <div className={ styles['header'] }>
                    <h2>Meet the Team</h2>
                    <div className={ styles['divider'] }></div>
                    <p>We are a team of motorcycle enthusiasts, engineers, and customer support experts dedicated to giving you the best shopping experience possible. Every recommendation we make is backed by years of experience and a true passion for riding.</p>
                </div>
                <div className={ styles['container'] }>
                    <div className={ styles['card'] }>
                        <img src="Developers/pasco-pic.webp" alt="" />
                        <div className={ styles['info'] }>
                            <h3>Pasco, Brian Lawrence C.</h3>
                            <h4>Leader / Developer / Designer</h4>
                        </div>
                    </div>
                    <div className={ styles['card'] }>
                        <img src="Developers/aba_a-pic.webp" alt="" />
                        <div className={ styles['info'] }>
                            <h3>Aba-a, Ivan</h3>
                            <h4>Developer</h4>
                        </div>
                    </div>
                    <div className={ styles['card'] }>
                        <img src="Developers/amancio-pic.webp" alt="" />
                        <div className={ styles['info'] }>
                            <h3>Amancio, C-jay</h3>
                            <h4>Developer</h4>
                        </div>
                    </div>
                    <div className={ styles['card'] }>
                        <img src="Developers/de_vera-pic.webp" alt="" />
                        <div className={ styles['info'] }>
                            <h3>De Vera, Nathan</h3>
                            <h4>Developer</h4>
                        </div>
                    </div>
                    <div className={ styles['card'] }>
                        <img src="Developers/salvador-pic.webp" alt="" />
                        <div className={ styles['info'] }>
                            <h3>Salvador, Lance</h3>
                            <h4>Developer</h4>
                        </div>
                    </div>
                    <div className={ styles['card'] }>
                        <img src="Developers/vardeleon-pic.webp" alt="" />
                        <div className={ styles['info'] }>
                            <h3>Vardeleon, Joshua</h3>
                            <h4>Developer</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

