import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmployeeLeave from "../pages/employee/EmployeeLeave";
import EmployeeAttendanceReport from "../pages/employee/EmployeeAttendanceReport";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManageEmployee from "../pages/manager/ManageEmployee";

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
      element: <ProtectedRoute />,
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
          element: <ManagerDashboard />,
        },
        {
          path: "/manage-employee",
          element: <ManageEmployee />,
        },
      ],
    },
  ];
  
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token)?routesForNotAuthenticatedOnly:[],
    ...(token && user.role=="EMPLOYEE")? routesForEmployeeOnly : [],
    ...(token && user.role=="MANAGER")? routesForManagerOnly: []
  ]);
  
  return <RouterProvider router={router} />;
};

export default RoutesIndex;

