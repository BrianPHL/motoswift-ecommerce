import { useContext, useState } from "react";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);
