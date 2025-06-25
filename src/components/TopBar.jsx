import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { HomeRounded } from '@mui/icons-material';
import { useCustomTheme } from '../contexts/ThemeContextProvider';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';


export default function TopBar() {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {darkTheme, toggleTheme } = useCustomTheme();

  const { setToken, user } = useAuth();
  
    const handleLogout = () => {
      setToken();
      navigate("/", { replace: true });
    };
  

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" sx={{padding: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>navigate("/")}
          >
            <HomeRounded />
          </IconButton>
          <Typography fontWeight="bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ELAMS
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>toggleTheme()}
          >
            {darkTheme? <LightModeRoundedIcon />: <DarkModeRoundedIcon />}
          </IconButton>
          <Typography>
            Hello, 
            <Typography component="span" fontWeight="bold"> {user.employeeName}</Typography>
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
  );
}