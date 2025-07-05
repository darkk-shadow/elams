import  {useEffect, useContext, useState} from 'react';
import Box from '@mui/material/Box';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button, Card, Grid, Typography, useTheme } from '@mui/material';
import Quotes from '../../components/employeeDashboard/Quotes';
import ClockInModule from '../../components/employeeDashboard/ClockInModule';
import LeaveBalanceModule from '../../components/employeeDashboard/LeaveBalanceModule';
import LeaveRequestModule from '../../components/employeeDashboard/LeaveRequestModule';
import AttendanceModule from '../../components/employeeDashboard/AttendanceModule';
import ApplyLeave from '../../components/employeeDashboard/ApplyLeave';
import LeaveSummary from '../../components/employeeDashboard/LeaveSummary';
import AttendanceSummary from '../../components/employeeDashboard/AttendanceSummary';
import LeaveDistribution from '../../components/employeeDashboard/LeaveDistribution';
import useIsMobile from '../../util/useMobile';


export default function EmployeeDashboard() {

  const [modalOpen, setModalOpen] = useState(false)
  const {isMobile} = useIsMobile();

  return (<Grid container spacing={4}>
      <ApplyLeave open={modalOpen} setOpen={setModalOpen} />
      <Grid size={{xs: 4}} >
        <Button variant='outlined' sx={{ gap: 1, justifySelf: "start" }}
          onClick={()=>setModalOpen(true)}
        >
          <EditNoteIcon />
          <Typography>{"Apply Leave"} </Typography>
        </Button>
      </Grid>
      {!isMobile && <Grid size={{xs: 8}}>
        <Quotes />
      </Grid>}
      <Grid size={{xs: 12, lg: 3.5}}>
        <ClockInModule />
      </Grid>
      <Grid size={{xs: 12, lg: 8.5}}>
        <LeaveSummary />
      </Grid>
      <Grid size={{xs: 12, lg: 3.5}}>
        <AttendanceModule />
      </Grid>
      <Grid size={{xs: 12, lg: 8.5}}>
        <Grid container spacing={4}>
          <Grid size={{xs: 12, md: 6}}>
            <AttendanceSummary />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <LeaveDistribution />
          </Grid>
        </Grid>
      </Grid>
        
      </Grid>
  );
}