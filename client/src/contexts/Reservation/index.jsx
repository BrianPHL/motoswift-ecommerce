import { useContext, useState } from "react";
import ReservationContext from "./context";

export const ReservationProvider = ({ children }) => {

    const [ reservationItems, setReservationItems ] = useState([]);

    const addToReservations = (item) => {
        setReservationItems(previous => [ ...previous, item ])
    };
    const clearReservations = () => setReservationItems([]);

    return (
        <ReservationContext.Provider value={{ reservationItems, addToReservations, clearReservations }}>
            { children }
        </ReservationContext.Provider>
    );

};

export const useReservation = () => useContext(ReservationContext);
