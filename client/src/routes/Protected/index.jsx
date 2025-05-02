import { useAuth } from "@contexts";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        
        const isAuthPage = location['pathname'] === '/sign-in' || location['pathname'] === '/sign-up';

        if (!user && !isAuthPage) {
            navigate('/sign-in');
        } else if (user && isAuthPage) {
            navigate('/');
        }

    }, [ user, navigate, location['pathname'] ])

    const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
    if ((!user && !isAuthPage) || (user && isAuthPage)) return null;

    return children;

};

export default ProtectedRoute;
