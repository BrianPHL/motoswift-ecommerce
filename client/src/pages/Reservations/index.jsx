import { useNavigate } from 'react-router';
import { Button, Anchor, InputField, ReturnButton, Accordion } from '@components';
import styles from './Reservations.module.css';
import { useReservation } from '@contexts';

const Reservations = ({}) => {

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
                        <div className={ styles['summary'] }>
                            <h2>Summary</h2>
                            <div className={ styles['divider'] }></div>
                            <div className={ styles['summary-container'] }>
                                <div className={ styles['summary-item'] }>
                                    <h3>Pending Reservations</h3>
                                    <h3>0</h3>
                                </div>
                                <div className={ styles['summary-item'] }>
                                    <h3>Cancelled Reservations</h3>
                                    <h3>0</h3>
                                </div>
                                <div className={ styles['summary-item'] }>
                                    <h3>Total Reservations</h3>
                                    <h3>0</h3>
                                </div>
                            </div>
                        </div>
                        <div className={ styles['list'] }>
                            { reservationItems.map(item => (
                                <Accordion
                                    key={ item['id'] }
                                    label='Reservation #'
                                    externalStyles={ styles['reservation'] }
                                >
                                    <div className={ styles['content'] }>
                                        <div className={ styles['details'] }>
                                            <h3>Reservation Details</h3>
                                            <div className={ styles['details-container'] }>
                                                <div className={ styles['details-item'] }>
                                                    <h4>Account Id</h4>
                                                    <h4>1</h4>
                                                </div>
                                                <div className={ styles['details-item'] }>
                                                    <h4>Full Name</h4>
                                                    <h4>John Doe</h4>
                                                </div>
                                                <div className={ styles['details-item'] }>
                                                    <h4>Contact Number</h4>
                                                    <h4>09452887632</h4>
                                                </div>
                                                <div className={ styles['details-item'] }>
                                                    <h4>Email Address</h4>
                                                    <h4>qblcpasco@tip.edu.ph</h4>
                                                </div>
                                                <div className={ styles['details-item'] }>
                                                    <h4>Preferred Date</h4>
                                                    <h4>{ item['preferredDate'] }</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={ styles['divider'] }></div>
                                        <div className={ styles['products'] }>
                                            <h3>Reserved Products:</h3>
                                            { item['products'].map(product => (
                                                <div className={ styles['product'] } key={ product['id']} onClick={ () => console.log("Navigate to details page") }>
                                                    <span>
                                                        <img src={`https://res.cloudinary.com/dfvy7i4uc/image/upload/${ product['image_url'] }`} alt="" />
                                                        <div className={ styles['product-details'] }>
                                                            <span>
                                                                <h3>{ product['label'] }</h3>
                                                                <h4>{ product['price'] }</h4>
                                                            </span>
                                                            <h4>{`Qty.: ${ product['quantity'] }`}</h4>
                                                        </div>
                                                    </span>
                                                    <i className='fa-solid fa-square-up-right'></i>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={ styles['divider'] }></div>
                                        <div className={ styles['ctas'] }>
                                            <Button
                                                type='primary'
                                                label='Checkout'
                                                disabled
                                            />
                                            <Button
                                                type='secondary'
                                                label='Cancel'
                                                action={ () => {} }
                                                externalStyles={ styles['reservation-cancel'] }
                                            />
                                        </div>
                                    </div>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default Reservations;