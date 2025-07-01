import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
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
import ManageAttendance from "../pages/manager/ManageAttendance.jsx"
import ManagerAttendanceProvider from "../contexts/ManagerAttendanceProvider.jsx";


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
      element:
      <EmployeeProvier>
      <EmployeeAttendanceProvider>
      <EmployeeLeaveProvider>
        <ProtectedRoute />
      </EmployeeLeaveProvider>
      </EmployeeAttendanceProvider>
      </EmployeeProvier>,
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
        },
        {
          path: "/profile",
          element: <EmployeeProfile />
        }
      ],
    },
  ];

  const routesForManagerOnly = [
    {
      path: "/",
      element: 
      <ManagerAttendanceProvider>
        <ProtectedRoute /> 
      </ManagerAttendanceProvider>
      ,  
      children: [
        {
          path: "/",
          element: <ManagerDashboard />,
        },
        {
          path: "/manage-employee",
          element: <ManageEmployee />,
        },
        {
          path: "/manage-leave",
          element: <ManageLeavePage />,
        },
        {
          path: "/manage-attendance",
          element: <ManageAttendance />,
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

