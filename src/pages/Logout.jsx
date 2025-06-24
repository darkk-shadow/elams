import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Button } from "@mui/material";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  return <>Logout Page
    <Button onClick={handleLogout} size="small">Logout</Button>
  </>;
};

export default Logout;