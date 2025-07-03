import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
  Checkbox,
  FormControlLabel,
  Link as MuiLink
} from "@mui/material";
import { useState } from "react";
import { login } from "../services/authService";
import ctslogo from "../assets/ctslogo.png";
import loginIllustration from "../assets/login illustration.png";

const Login = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({
        email: e.target[0].value,
        password: e.target[2].value,
      })
      .then((res) => {
        setToken(res.data.jwtToken);
        setUser(res.data);
        navigate("/", { replace: true });
        window.location.reload()
      })
      .catch((a) => {
        setError(true);
        setErrorMsg(a.response.data.message);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fa",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          overflow: "hidden",
          width: { xs: 340, md: 700 },
          minHeight: { xs: 480, md: 400 },
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        {/* Left Side - Info Only, No Image */}
        <Box
          sx={{
            flex: 1.2,
            background: "linear-gradient(120deg, #3a7bd5 0%, #00d2ff 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            position: "relative",
            minHeight: { xs: 180, md: 400 },
          }}
        >
          <Typography variant="h4" fontWeight={700} color="#fff" mb={2} align="center">
            Welcome to ELAMS
          </Typography>
          <Typography variant="body1" color="#e3f2fd" align="center" sx={{ maxWidth: 450, mb: 2 }}>
            Effortlessly Manage your Attendance and leave.
          </Typography>
          {/* <Typography variant="body2" color="#e3f2fd" align="center" sx={{ maxWidth: 220 }}>
            Manage your work hours, request time off, and view your leave balance with ease.
          </Typography> */}
          <img
            src={loginIllustration}
            alt="Login Illustration"
            style={{
              width: "100%",
              maxWidth: 250, // reverted to original size
              borderRadius: 0,
              boxShadow: "none",
              marginTop: 18,
              objectFit: "cover",
              background: "none"
            }}
          />
        </Box>
        {/* Right Side - Login Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 2, md: 4 },
            background: "#fff",
          }}
        >
          <img
            src={ctslogo}
            alt="Cognizant Logo"
            style={{
              width: 180,
              marginBottom: 18,
            }}
          />
          <Box sx={{ width: "100%", maxWidth: 220 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
              color={theme.palette.primary.main}
              align="left"
            >
              Login
            </Typography>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <TextField
                onChange={() => setError(false)}
                id="email"
                label="Email address"
                size="small"
                error={error}
                autoComplete="username"
                InputProps={{ style: { background: "#f5f7fa" } }}
                required
              />
              <TextField
                onChange={() => setError(false)}
                helperText={errorMsg}
                error={error}
                id="password"
                type="password"
                label="Password"
                size="small"
                autoComplete="current-password"
                InputProps={{ style: { background: "#f5f7fa" } }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 1,
                  py: 1,
                  mt: 1,
                  borderRadius: 2,
                  fontSize: 15,
                  boxShadow: "0 2px 8px 0 rgba(58,123,213,0.10)",
                }}
                fullWidth
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;