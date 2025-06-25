import  {useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import TopBar from '../components/TopBar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button, Card, Paper, Typography, useTheme } from '@mui/material';
import Quotes from '../components/employeeDashboard/Quotes';
import ClockInModule from '../components/employeeDashboard/ClockInModule';
import LeaveBalanceModule from '../components/employeeDashboard/LeaveBalanceModule';
import LeaveRequestModule from '../components/employeeDashboard/LeaveRequestModule';
import AttendanceModule from '../components/employeeDashboard/AttendanceModule';
import { ThemeContext } from '../contexts/ThemeContextProvider';

export default function MenuAppBar() {

  const {darkTheme, toggleTheme } = useContext(ThemeContext);

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
    <Card sx={{
      padding: 0, border: "none",
      borderRadius: 0,
      bgcolor: darkTheme ? "#303030" : "#eef7fa"
    }}
      variant='outlined'>
      <TopBar />
      <Box></Box>
      <Box sx={styles.bodyLayout}>
        <Button variant='outlined' sx={{ gap: 1, justifySelf: "start" }}>
          <EditNoteIcon />
          <Typography>{"Apply Leave"} </Typography>
        </Button>
        <Quotes />
        <ClockInModule />
        <LeaveBalanceModule />
        <AttendanceModule />
        <LeaveRequestModule />
      </Box>
    </Card>
  );
}