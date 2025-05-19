import { useContext, useState, useRef, useEffect } from "react";
import { useAuth, useToast } from '@contexts';
import ReservationContext from "./context";

export const ReservationProvider = ({ children }) => {
    const [  reservationItems, setReservationItems ] = useState([]);
    const [  loading, setLoading ] = useState(false);
    const [  recentReservations, setRecentReservations ] = useState([]);
    const [  pendingReservationsCount, setPendingReservationsCount ] = useState(0);
    const { user } = useAuth();
    const { showToast } = useToast();
    const reservationCounter = useRef(1);

    const fetchReservations = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/reservations/${user['account_id']}`, {
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

    const fetchRecentReservations = async () => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/reservations/recent', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch recent reservations');
            }
            
            setRecentReservations(data);
            const pendingCount = data.filter(r => r.status === 'pending').length;
            setPendingReservationsCount(pendingCount);
            
            return data;
        } catch (error) {
            console.error('Error fetching recent reservations:', error);
            return [];
        }
    };

    const addToReservations = async (item) => {

        if (!user) {
            showToast("You must be logged in to make reservations.", "error");
            return { error: "Not authenticated" };
        }

        try {
            setLoading(true);

            const productsToReserve = Array.isArray(item.products) ? item.products : [item.product];
            for (const product of productsToReserve) {
                const stockResponse = await fetch(`/api/stocks/${product.product_id}/stock`);
                if (stockResponse.ok) {
                    const stockData = await stockResponse.json();
                    if (stockData.stock_quantity <= 0) {
                        showToast(`Sorry, ${product.label} is currently out of stock.`, 'error');
                        return { error: "Out of stock" };
                    }
                }
            }
            
            const reservationData = {
                account_id: user.account_id,
                preferred_date: item.preferredDate,
                notes: item.notes || '',
                products: productsToReserve
            };
            
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create reservation!');
            }
            
            await fetchReservations();
            showToast("Reservation added successfully!", "success");
            
            return { success: true, reservation_id: data.reservation_id };
        } catch (err) {
            console.error("Failed to add reservation:", err);
            showToast(`Failed to add reservation: ${err.message}`, "error");
            return { error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const cancelReservation = async (reservation_id) => {
        if (!user) return;

        try {
            setLoading(true);
            
            const response = await fetch(`/api/reservations/${reservation_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'cancelled' })
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to cancel reservation!');
            }
            
            setReservationItems(prev => 
                prev.map(item => 
                    item.reservation_id === reservation_id 
                    ? { ...item, status: 'cancelled' } 
                    : item
                )
            );
            
            showToast("Reservation cancelled successfully!", "success");
        } catch (err) {
            console.error("Failed to cancel reservation:", err);
            showToast(`Failed to cancel reservation: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteReservation = async (reservation_id) => {
        if (!user) return;

        try {
            setLoading(true);

            const response = await fetch(`/api/reservations/${reservation_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete reservation!');
            }
            
            setReservationItems(prev => 
                prev.filter(item => item.reservation_id !== reservation_id)
            );

            if (recentReservations) {
                setRecentReservations(prev => 
                    prev.filter(item => item.reservation_id !== reservation_id)
                );
            }

            showToast("Reservation deleted successfully!", "success");
            return true;
        } catch (err) {
            console.error("Failed to delete reservation:", err);
            showToast(`Failed to delete reservation: ${err.message}`, "error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.account_id) {
            fetchReservations();
        }
    }, [user]);

    return (
        <ReservationContext.Provider value={{ 
            reservationItems,
            recentReservations,
            pendingReservationsCount,
            fetchRecentReservations,
            addToReservations, 
            cancelReservation,
            deleteReservation,
            refreshReservations: fetchReservations 
        }}>
            { children }
        </ReservationContext.Provider>
    );
};

export const useReservation = () => useContext(ReservationContext);
