import { useAuth } from "@contexts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/sign-in');
    }, [ user, navigate ])

    return user ? children : null;

};

export default ProtectedRoute;
