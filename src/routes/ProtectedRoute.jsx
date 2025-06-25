import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import TopBar from "../components/TopBar";

export const ProtectedRoute = () => {
    const {token} = useAuth();

    if(!token) {
        return <Navigate to="/login" />;
    }

    return <>
        <TopBar />
        <Outlet /> 
    </>;
}