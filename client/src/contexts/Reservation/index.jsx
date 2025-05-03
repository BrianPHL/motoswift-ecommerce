import { useContext, useState, useRef } from "react";
import ReservationContext from "./context";

export const ReservationProvider = ({ children }) => {

    const [ reservationItems, setReservationItems ] = useState([]);
    const reservationCounter = useRef(1);

    const addToReservations = (item) => {
        const reservationId = `R-${String(reservationCounter.current).padStart(6, '0')}`;
        reservationCounter['current'] += 1;
        const products = Array.isArray(item['products'])
            ? item['products']
            : item['product']
                ? [ item['product'] ]
                : [];

        setReservationItems(previous => [
            ...previous,
            {
                ...item,
                reservationId,
                products,
                preferredDate: item['preferredDate']
            }
        ]);
    };
    const clearReservations = () => setReservationItems([]);

    return (
        <ReservationContext.Provider value={{ reservationItems, addToReservations, clearReservations }}>
            { children }
        </ReservationContext.Provider>
    );

};

export const useReservation = () => useContext(ReservationContext);
