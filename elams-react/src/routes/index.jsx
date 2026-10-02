import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Login from "../pages/Login";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmployeeLeave from "../pages/employee/EmployeeLeave";
import EmployeeAttendanceReport from "../pages/employee/EmployeeAttendanceReport";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManageEmployee from "../pages/manager/ManageEmployee";
import ManageLeavePage from '../pages/manager/ManageLeave';
import EmployeeLeaveProvider from "../contexts/EmployeeLeaveProvider";
import EmployeeAttendanceProvider from "../contexts/EmployeeAttendanceProvider";
import EmployeeProfile from "../pages/employee/EmployeeProfile";
import EmployeeProvier from "../contexts/EmployeeProvider";
import ManageAttendance from "../pages/manager/ManageAttendance.jsx";
import ManagerAttendanceProvider from "../contexts/ManagerAttendanceProvider.jsx";
import ManagerLeaveProvider from "../contexts/ManagerLeaveProvider.jsx";
import ManagerProfile from "../pages/manager/ManagerProfile.jsx";
import ManagerProvider from "../contexts/ManagerProvider.jsx";
import ManagerEmployeeProvider from "../contexts/ManagerEmployeesProvider.jsx";
import TopBar from "../components/TopBar";
import PageWrapper from "../components/PageWrapper";
import useIsMobile from "../util/useMobile";
import { Box } from "@mui/material";

// ── Auth guard layout ────────────────────────────────────────────────────────
// Renders TopBar + page content. Redirects to /login if not authenticated.
const AuthLayout = () => {
  const { token } = useAuth();
  const { isMobile } = useIsMobile();

  if (!token) return <Navigate to="/login" replace />;

  return (
    <PageWrapper>
      <TopBar />
      <Box sx={{ paddingY: 2, paddingX: isMobile ? 2 : 10 }}>
        <Outlet />
      </Box>
    </PageWrapper>
  );
};

// ── Role-based providers layout ──────────────────────────────────────────────
// Wraps children with the correct providers for the user's role.
const RoleBasedLayout = () => {
  const { user } = useAuth();

  if (user?.role === "EMPLOYEE") {
    return (
      <EmployeeProvier>
        <EmployeeAttendanceProvider>
          <EmployeeLeaveProvider>
            <Outlet />
          </EmployeeLeaveProvider>
        </EmployeeAttendanceProvider>
      </EmployeeProvier>
    );
  }

  if (user?.role === "MANAGER" || user?.role === "ADMIN") {
    return (
      <ManagerProvider>
        <ManagerEmployeeProvider>
          <ManagerLeaveProvider>
            <ManagerAttendanceProvider>
              <Outlet />
            </ManagerAttendanceProvider>
          </ManagerLeaveProvider>
        </ManagerEmployeeProvider>
      </ManagerProvider>
    );
  }

  // Unknown role — go back to login
  return <Navigate to="/login" replace />;
};

// ── Smart index: shows the right dashboard based on role ─────────────────────
const DashboardIndex = () => {
  const { user } = useAuth();
  if (user?.role === "EMPLOYEE") return <EmployeeDashboard />;
  if (user?.role === "MANAGER" || user?.role === "ADMIN") return <ManagerDashboard />;
  return null;
};

// ── Smart profile: shows the right profile based on role ─────────────────────
const ProfileIndex = () => {
  const { user } = useAuth();
  if (user?.role === "EMPLOYEE") return <EmployeeProfile />;
  if (user?.role === "MANAGER" || user?.role === "ADMIN") return <ManagerProfile />;
  return null;
};

// ── Single stable router (created once at module level) ───────────────────────
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        element: <RoleBasedLayout />,
        children: [
          // Shared routes (role-aware components inside)
          { index: true,                  element: <DashboardIndex /> },
          { path: "profile",              element: <ProfileIndex /> },

          // Employee-only routes
          { path: "leaveManagement",      element: <EmployeeLeave /> },
          { path: "attendanceManagement", element: <EmployeeAttendanceReport /> },

          // Manager-only routes
          { path: "manage-employee",      element: <ManageEmployee /> },
          { path: "manage-leave",         element: <ManageLeavePage /> },
          { path: "manage-attendance",    element: <ManageAttendance /> },
        ],
      },
    ],
  },
  // Catch-all fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);

const RoutesIndex = () => <RouterProvider router={router} />;

export default RoutesIndex;
