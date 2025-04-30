import { useContext, useState } from "react";
import AuthContext from "./context";

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = ({ email, password }) => {
        console.log(email, password)
        if (
            email === "john.doe@motoswift.com" &&
            password === "john.doe073"
        ) {
            setUser({
                id: 1,
                name: "John Doe",
                email: "john.doe@motoswift.com"
            });
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);