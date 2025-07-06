import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from 'react-router-dom';

export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const options = [
    {
      label: "Dashboard",
      action: ()=>navigate("/"),
      icon: <SpaceDashboardIcon />,
    },
    {
      label: "Leave",
      action: ()=>navigate("/leaveManagement"),
      icon: <EditNoteIcon />,
    },
    {
      label: "Attendance",
      action: ()=>navigate("/attendanceManagement"),
      icon: <AssignmentTurnedInIcon />,
    },
  ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {options.map((option) => (
          <ListItem key={option.label} disablePadding>
            <ListItemButton onClick={option.action} sx={{color: "primary.main"}}>
              <ListItemIcon sx={{color: "primary.main"}}>
                {option.icon}
              </ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{color: "primary.main"}} />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
        {DrawerList}
      </Drawer>
    </div>
  );
}
