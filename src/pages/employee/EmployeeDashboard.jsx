import  {useEffect, useContext, useState} from 'react';
import Box from '@mui/material/Box';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button, Card, Typography, useTheme } from '@mui/material';
import Quotes from '../../components/employeeDashboard/Quotes';
import ClockInModule from '../../components/employeeDashboard/ClockInModule';
import LeaveBalanceModule from '../../components/employeeDashboard/LeaveBalanceModule';
import LeaveRequestModule from '../../components/employeeDashboard/LeaveRequestModule';
import AttendanceModule from '../../components/employeeDashboard/AttendanceModule';
import ApplyLeave from '../../components/employeeDashboard/ApplyLeave';
import LeaveSummary from '../../components/employeeDashboard/LeaveSummary';
import AttendanceSummary from '../../components/employeeDashboard/AttendanceSummary';
import LeaveDistribution from '../../components/employeeDashboard/LeaveDistribution';


export default function EmployeeDashboard() {

  const [modalOpen, setModalOpen] = useState(false)

  return (<Box sx={{
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "2em",
    }}>
      <ApplyLeave open={modalOpen} setOpen={setModalOpen} />
        <Button variant='outlined' sx={{ gap: 1, justifySelf: "start" }}
          onClick={()=>setModalOpen(true)}
        >
          <EditNoteIcon />
          <Typography>{"Apply Leave"} </Typography>
        </Button>
        <Quotes />
        <ClockInModule />
        <LeaveSummary />
        <AttendanceModule />
        <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4}}>
          <AttendanceSummary />
          <LeaveDistribution />
        </Box>
        
      </Box>
  );
}