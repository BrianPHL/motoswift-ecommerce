import { useNavigate } from 'react-router';
import { Button, Anchor, InputField, ReturnButton, Accordion } from '@components';
import styles from './Reservations.module.css';
import { useReservation } from '@contexts';

const Reservations = () => {

    const { reservationItems, addToReservations, clearReservations } = useReservation();
    const navigate = useNavigate();

    return (
        <div className={ styles['wrapper'] }>
            <div className={ styles['banner'] }></div>
            <div className={ styles['header'] }>
                <ReturnButton />
                <h1>Your Reservations</h1>
            </div>
            <div className={ styles['container'] }>
                { reservationItems.length === 0 ? (
                    <div className={ styles['empty'] }>
                        <h3>Your Reservations is empty!</h3>
                        <p>Start browsing for items in <Anchor label="Motorcycles" link="/motorcycles" isNested={ false }/> or <Anchor label="Parts & Accessories" link="/parts-and-accessories" isNested={ false }/>.</p>
                        <p>or</p>
                        <p>Add items to <Anchor label="Cart" link="/cart" isNested={ false }/> to reserve by batch.</p>
                    </div>
                ) : (
                    <div className={ styles['reservations'] }>
                        { reservationItems.map(item => (
                        <Accordion
                            key={ item.reservationId }
                            label={ `Reservation ID: #${item.reservationId}` }
                            externalStyles={ styles['reservations-item'] }
                        >
                            <div className={styles['reservations-details']}>
                                <p><strong>Full Name:</strong> John Doe</p>
                                <p><strong>Account ID:</strong> #1</p>
                                <p><strong>Contact Number:</strong> 0945123456</p>
                                <p><strong>Email Address:</strong> john.doe@motoswift.com</p>
                                <p><strong>Preferred Reservation Date:</strong> {item.preferredDate}</p>
                                <p><strong>Reserved Products:</strong></p>
                                <div className={styles['reserved-products-list']}>
                                    {item.products && item.products.map(prod => (
                                        <div key={prod.id} className={styles['reserved-product']}>
                                            <span>#{prod.id} - {prod.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Accordion>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

};

export default Reservations;