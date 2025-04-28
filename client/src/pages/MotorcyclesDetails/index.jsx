import { Button } from '@components';
import styles from './MotorcyclesDetails.module.css';
import { useNavigate } from 'react-router';

const MotorcyclesDetails = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>
                <div className={styles['imageContainer']}>
                    <img></img>
                </div>
                <div className={styles['Details']}>
                    <div className={styles['productDescription']}>
                        <h1>The New CLICK125</h1>
                        <h2>Brand: Honda | Category: Scooters</h2>
                        <p>Unleash #The Ultimate Game Changer with The New Click125 showcasing a fresh design featuring striking new two-tone colors and dynamic stripes for the Click125 Standard Variant, while complemented by a sophisticated 3D Emblem exclusive to Special Edition Variant.

                        The New Click125 Standard variant comes in Four striking colors available in:

                        Pearl Arctic White
                        Pearl Sylvestris Gray
                        Stellar Blue Metallic
                        Obsidian Black Metallic</p>

                        <h1>PHP123,456.78</h1>
                    </div>
                    <div className={styles['buttonContainer']}>
                        <div className={styles['reserveButton']}>
                        <Button label="Reserve Now" type="primary" action={() => console.log('Submit')} />
                        </div>
                        <div className={styles['cartIcon']}>
                        <Button label="Add to Cart" type="secondary" action={() => {}} icon="fa-solid fa-cart-shopping" iconPosition="left" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
  
export default MotorcyclesDetails;
