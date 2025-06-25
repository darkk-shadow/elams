import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Login from "../pages/Login";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import EmployeeLeave from "../pages/EmployeeLeave";
import EmployeeAttendanceReport from "../pages/EmployeeAttendanceReport";

const RoutesIndex = () => {
    const {token, user} = useAuth();

    const routesForPublic = [
      {
          path: "/login",
          element: <Login />
      },
      {
          path: "/about-us",
          element: <div>About Us</div>
      }
  ];
  
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>please login</div>,
    }
  ];

  const routesForEmployeeOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <EmployeeDashboard />,
        },
        {
          path: "/leaveManagement",
          element: <EmployeeLeave />,
        },
        {
          path: "/attendanceManagement",
          element: <EmployeeAttendanceReport />,
        }
      ],
    },
  ];

  const routesForManagerOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <div>Manager Dashboard</div>,
        },
      ],
    },
  ];
  
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(user.role=="EMPLOYEE")? routesForEmployeeOnly : [],
    ...(user.role=="MANAGER")? routesForManagerOnly: []
  ]);
  
  return <RouterProvider router={router} />;
};

export default RoutesIndex;

