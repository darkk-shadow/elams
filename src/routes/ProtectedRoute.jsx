import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import TopBar from "../components/TopBar";
import PageWrapper from "../components/PageWrapper";
import { Box } from "@mui/material";

export const ProtectedRoute = () => {
    const {token} = useAuth();

    if(!token) {
        return <Navigate to="/login" />;
    }

    return <PageWrapper>
        <TopBar />
        <Box sx={{
            paddingY: 2,
            paddingX: 10,
        }}>
            <Outlet />
        </Box>
    </PageWrapper>
}