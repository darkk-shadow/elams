import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    // Save both token AND user whenever either changes.
    // Previously only [token] was in the dep array — React batches setToken+setUser,
    // so the effect fired with the new token but stale user=null, writing null to localStorage.
    useEffect(() => {
        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else if (!token) {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, [token, user]);

    return (
        <AuthContext.Provider value={{token, setToken, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;