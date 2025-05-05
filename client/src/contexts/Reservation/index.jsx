import { useContext, useState, useRef, useEffect } from "react";
import { useAuth, useToast } from '@contexts';
import ReservationContext from "./context";

export const ReservationProvider = ({ children }) => {

    const [ reservationItems, setReservationItems ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const { user } = useAuth();
    const { showToast } = useToast();
    const reservationCounter = useRef(1);

    const fetchReservations = async () => {

        if (!user) return;

        try {

            setLoading(true);

            const response = await fetch(`/api/reservations/${ user['account_id'] }`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch reservations!');
            }

            setReservationItems(data || []);

        } catch (err) {
            console.error("Failed to fetch reservations:", err);
            showToast(`Failed to load your reservations: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }

    };

    const addToReservations = async (item) => {

        console.log("yes?")
        
        if (!user) return;

        try {

            setLoading(true);

            const products = Array.isArray(item['products'])
                ? item['products']
                : item['product']
                    ? [ item['product'] ]
                    : [];

            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account_id: user['account_id'],
                    preferred_date: item['preferredDate'],
                    notes: item['notes'],
                    products: products
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create reservation!');
            }

            await fetchReservations();

            return data['reservation_id'];

        } catch (err) {
            console.error("Failed to add reservation:", err);
            showToast(`Failed to create reservation: ${err.message}`, "error");
            throw err;
        } finally {
            setLoading(false);
        }
        
    };

    const cancelReservation = async (reservation_id) => {

        console.log(reservation_id)

        if (!user) return;

        try {

            setLoading(true);

            const response = await fetch(`/api/reservations/${ reservation_id }`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'cancelled'
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to cancel the reservation!');
            }

            setReservationItems(previous => 
                previous.map(item => 
                    item['reservation_id'] === reservation_id 
                        ? { ...item, status: 'cancelled' } 
                        : item
                )
            );

            showToast('Reservation cancelled successfully!', 'success');
            
        } catch (err) {
            console.error("Failed to cancel reservation:", err);
            showToast(`Failed to cancel reservation: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }

    };

    const reactivateReservation = async (reservation_id) => {

        if (!user) return;

        try {

            setLoading(true);

            const response = await fetch(`/api/reservations/${ reservation_id }`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'pending'
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to reactivate the reservation!');
            }

            setReservationItems(previous => 
                previous.map(item => 
                    item['reservation_id'] === reservation_id 
                        ? { ...item, status: 'pending' } 
                        : item
                )
            );

            showToast('Reservation reactivated successfully!', 'success');
            
        } catch (err) {
            console.error("Failed to reactivate reservation:", err);
            showToast(`Failed to reactivate reservation: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }

    };

    const deleteReservation = async (reservation_id) => {

        if (!user) return;

        try {

            setLoading(true);

            const response = await fetch(`/api/reservations/${ reservation_id }`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete the cancelled reservation!');
            }

            setReservationItems(previous => previous.filter(item => item['reservation_id'] !== reservation_id));

            showToast('Cancelled Reservation deleted successfully!', 'success');
            
        } catch (err) {
            console.error("Failed to delete the cancelled reservation:", err);
            showToast(`Failed to delete the cancelled reservation: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (user?.account_id) {
            fetchReservations();
        }
    }, [ user ]);

    return (
        <ReservationContext.Provider value={{ reservationItems, addToReservations, cancelReservation, reactivateReservation, deleteReservation, refreshReservations: fetchReservations }}>
            { children }
        </ReservationContext.Provider>
    );

};

export const useReservation = () => useContext(ReservationContext);
