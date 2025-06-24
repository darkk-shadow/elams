import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Login from "../pages/Login";
import EmployeeDashboard from "../pages/EmployeeDashboard";

const RoutesIndex = () => {
    const {token} = useAuth();

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
  
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <EmployeeDashboard />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];
  
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>please login</div>,
    }
  ];
  
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly
  ]);
  
  return <RouterProvider router={router} />;
};

export default RoutesIndex;

