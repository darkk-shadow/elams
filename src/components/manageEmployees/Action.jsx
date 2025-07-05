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
import { Popper } from '@mui/material';

export default function Action({data}) {
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
        {data.map((d) => (  
          <SpeedDialAction
            key={d.label}
            icon={<d.icon sx={{color: `${d.color}.main`}}/>}
            onClick={d.action}
            slotProps={{
              tooltip: {
                open: true,
                title: d.label
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}