import * as React from 'react';
import Box from '@mui/material/Box';
import TopBar from '../components/TopBar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button, Card, Paper, Typography, useTheme } from '@mui/material';
import Quotes from '../components/Quotes';
import ClockInModule from '../components/ClockInModule';
import LeaveBalanceModule from '../components/LeaveBalanceModule';
import LeaveRequestModule from '../components/LeaveRequestModule';
import AttendanceModule from '../components/AttendanceModule';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const theme = useTheme();
  
  /** @type {import('@mui/system').SxProps} */
  const styles = {
    bodyLayout: {
      paddingY: 2,
      paddingX: 10,
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "2em",
    }
  
  }
  return (
    <Box>
      <TopBar />
      <Box></Box>
      <Box sx={styles.bodyLayout}>
        <Button variant='outlined' sx={{gap: 1}}>
          <EditNoteIcon/>
          <Typography>{"Apply Leave"} </Typography>
        </Button>
        <Quotes />
        <ClockInModule />
        <LeaveBalanceModule />
        <AttendanceModule />
        <LeaveRequestModule />
      </Box>
    </Box>
  );
}