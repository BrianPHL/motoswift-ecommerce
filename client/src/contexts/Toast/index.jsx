import { useCallback, useContext, useState, useEffect } from "react";
import { Toast } from '@components';
import ToastContext from "./context";

export const ToastProvider =({ children }) => {

    const [ toasts, setToasts ] = useState([]);
    const showToast = useCallback((message, type = 'info') => {
        const identifier = Date.now() + Math.random();
        setToasts(previous => [...previous, { identifier, message, type }]);
        setTimeout(() => {
            setToasts(previous => previous.filter(toast => toast.identifier !== identifier));
        }, 2500);

    }, []);

    const removeToast = useCallback((identifier) => {
        setToasts(previous => previous.filter(toast => toast.identifier !== identifier));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            { children }
            <div style={{
                flexDirection: "column",
                marginTop: '7rem',
                position: "fixed",
                display: "flex",
                zIndex: 9999,
                right: '1rem',
                top: '1rem',
                gap: "1rem"
            }}>
                { toasts.map(toast => (
                    <Toast
                        key={ toast['identifier'] }
                        message={ toast['message'] }
                        type={ toast['type'] }
                        onClose={ () => removeToast(toast['identifier']) }
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );


};

export const useToast = () => useContext(ToastContext);
