import { useState } from 'react';
import styles from './ReservationForm.module.css';

const motorcycleImages = {
    "HONDA ADV160": "https://cms.hondaph.com/images/products/63d089a4674af.png",
    "YAMAHA AEROX155": "/images/aerox155.png",
    // Add more motorcycles and their images here
};

const Reservation = () => {
    const [selectedMotorcycle, setSelectedMotorcycle] = useState("HONDA ADV160");

    const handleMotorcycleChange = (e) => {
        setSelectedMotorcycle(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img 
                    src={motorcycleImages[selectedMotorcycle]} 
                    alt={selectedMotorcycle} 
                    className={styles.motorcycleImage}
                />
            </div>

            <form className={styles.form}>
                <h1 className={styles.title}>RESERVATION FORM</h1>

                <label className={styles.label} htmlFor="motorcycle">Motorcycle Selection</label>
                <select 
                    id="motorcycle" 
                    className={styles.input} 
                    value={selectedMotorcycle} 
                    onChange={handleMotorcycleChange}
                >
                    <option>HONDA ADV160</option>
                    <option>Honda Beat (Premium)</option>
                    {/* Add more options as needed */}
                </select>

                <label className={styles.label} htmlFor="name">Full Name</label>
                <input type="text" id="name" className={styles.input} placeholder="Enter Your Full Name" />

                <label className={styles.label} htmlFor="contact">Contact Number</label>
                <input type="tel" id="contact" className={styles.input} placeholder="Enter Your Contact Number" />

                <label className={styles.label} htmlFor="email">Email</label>
                <input type="email" id="email" className={styles.input} placeholder="Enter Your Email Address" />

                <label className={styles.label} htmlFor="date">Preferred Reservation Date</label>
                <input type="date" id="date" className={styles.input} />

                <div className={styles.checkboxWrapper}>
                    <input type="checkbox" id="terms" className={styles.checkbox} />
                    <label htmlFor="terms" className={styles.checkboxLabel}>I agree to the terms and conditions</label>
                </div>

                <button type="submit" className={styles.button}>Submit Reservation</button>
            </form>
        </div>
    );
};

export default Reservation;
