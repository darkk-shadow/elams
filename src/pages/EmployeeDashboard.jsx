import  {useEffect, useContext, useState} from 'react';
import Box from '@mui/material/Box';
import TopBar from '../components/TopBar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button, Card, Modal, Paper, Typography, useTheme } from '@mui/material';
import Quotes from '../components/employeeDashboard/Quotes';
import ClockInModule from '../components/employeeDashboard/ClockInModule';
import LeaveBalanceModule from '../components/employeeDashboard/LeaveBalanceModule';
import LeaveRequestModule from '../components/employeeDashboard/LeaveRequestModule';
import AttendanceModule from '../components/employeeDashboard/AttendanceModule';
import { useCustomTheme } from '../contexts/ThemeContextProvider';
import ApplyLeave from '../components/employeeDashboard/ApplyLeave';
import PageWrapper from '../components/PageWrapper';

export default function MenuAppBar() {

  const {darkTheme} = useCustomTheme()

  const [modalOpen, setModalOpen] = useState(false)

  /** @type {import('@mui/system').SxProps} */
  const styles = {
    bodyLayout: {
      paddingY: 2,
      paddingX: 10,
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "2em",
    },
    modal:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }

  }

  return (
    <Card sx={{
          padding: 0, border: "none",
          borderRadius: 0,
          bgcolor: darkTheme ? "#303030" : "#eef7fa"
        }}
        variant='outlined'>
      <ApplyLeave open={modalOpen} setOpen={setModalOpen} />
      <Box></Box>
      <Box sx={styles.bodyLayout}>
        <Button variant='outlined' sx={{ gap: 1, justifySelf: "start" }}
          onClick={()=>setModalOpen(true)}
        >
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