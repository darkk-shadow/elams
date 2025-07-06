import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import TopBar from "../components/TopBar";
import PageWrapper from "../components/PageWrapper";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import useIsMobile from "../util/useMobile";

export const ProtectedRoute = () => {
    const {token} = useAuth();
    const theme = useTheme();
    const {isMobile} = useIsMobile()

    if(!token) {
        return <Navigate to="/login" />;
    }

    return <PageWrapper>
        <TopBar />
        <Box sx={{
            paddingY: 2,
            paddingX: isMobile? 2 : 10,
        }}>
            <Outlet />
        </Box>
    </PageWrapper>
}