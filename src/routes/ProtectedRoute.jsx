import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import TopBar from "../components/TopBar";
import PageWrapper from "../components/PageWrapper";

export const ProtectedRoute = () => {
    const {token} = useAuth();

    if(!token) {
        return <Navigate to="/login" />;
    }

    return <PageWrapper>
        <TopBar />
        <Outlet />
    </PageWrapper>
}