import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:9090/auth/login", {
        email: e.target[0].value,
        password: e.target[2].value,
      })
      .then((res) => {
        setToken(res.data.token);
        navigate("/", { replace: true });
      })
      .catch((a) => {
        setError(true);
        setErrorMsg(a.response.data.error);
      });
  };

  const styles = {
    form: {
      display: "grid",
      placeContent: "center",
      gap: "2em",
      padding: "2em",
      borderLeft: "1px solid black"
    },
    loginLayout: {
      height: "100%",
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: "1fr 1fr",
      placeContent: "center"
    }
  };

  return (
    <Box sx={styles.loginLayout}>
      <Box>

      </Box>
      <Box>
        <image src/>
        <Typography variant="h6" align="center">
          Employee Login
        </Typography>
        <form onSubmit={handleLogin} style={styles.form}>
          <TextField
            onChange={() => setError(false)}
            id="email"
            label="Email"
            size="small"
            fullWidth={false}
            error={error}
          />
          <TextField
            onChange={() => setError(false)}
            helperText={errorMsg}
            error={error}
            id="password"
            type="password"
            label="Password"
            size="small"
          />
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
