import { Button } from '@components';
import styles from './PartsAndAccessoriesDetails.module.css';
import { useNavigate } from 'react-router';

const PartsAndAccessoriesDetails = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>
                <div className={styles['imageContainer']}>
                    <img></img>
                </div>
                <div className={styles['Details']}>
                    <div className={styles['productDescription']}>
                        <h1>Krator Universal Black Motorcycle Mirrors for Street Bike, Sportbike, Naked Bike, Cruiser, Chopper, Scooter, Moped, ATV (8mm + 10mm Bolt Adapters) - Pair</h1>
                        <h2>Brand: Kratos | Category: Motor Parts</h2>
                        <p>High Quality Black Mirrors (Left & Right Sides)
                        Adjustable Mirror Angle, Up and Down, Left and Right
                        Quantity: 1 Pair (Left and Right)
                        Brand: Krator | Color: Black
                        Universal Mirrors will fit the vast majority of motorcycles including Honda, Suzuki, Yamaha, Kawasaki, etc.</p>

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
  
export default PartsAndAccessoriesDetails;