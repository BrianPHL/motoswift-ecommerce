import { useAuth } from "@contexts";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        
        if (loading) return;
        
        const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
        const isAdminPage = location.pathname === '/admin';

        if (!user && !isAuthPage) {
            navigate('/sign-in');
        } else if (user && isAuthPage) {
            navigate('/');
        } else if (user && isAdminPage && user?.role !== 'admin') {
            navigate('/');
        }
    }, [user, loading, navigate, location.pathname]);

    if (loading) return null;

    const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
    const isAdminPage = location.pathname === '/admin';

    if ((!user && !isAuthPage) || (user && isAuthPage)) return null;
    
    if (isAdminPage && user?.role !== 'admin') {
        return null;
    }

    return children;
};

export default ProtectedRoute;
