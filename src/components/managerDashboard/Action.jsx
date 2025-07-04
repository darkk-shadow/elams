import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GroupsIcon from '@mui/icons-material/Groups';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: <GroupsIcon />, name: 'Employees', link: "/manage-employee" },
  { icon: <ChecklistRtlIcon />, name: 'Attendance', link: "/manage-attendance" },
  { icon: <CalendarMonthIcon />, name: 'Leave', link: "manage-leave" }
];

export default function Action() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }} >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        onClick={()=>p=>!p}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={()=>navigate(action.link)}
            slotProps={{
              tooltip: {
                open: true,
                title: action.name
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}