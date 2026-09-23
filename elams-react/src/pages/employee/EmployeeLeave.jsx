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
import LeaveBalanceInfo from '../../components/leaveManagement/LeaveBalanceInfo';
import {Grid} from "@mui/material"


export default function EmployeeLeave() {

  const [modalOpen, setModalOpen] = useState(false)

  return (<Grid container spacing={4}>
        <Grid container spacing={4}>
          <Grid size={{xs: 12, md: "grow" }}>
            <LeaveBalanceModule />
          </Grid>
          <Grid size={{xs: "auto"}}>
            <LeaveBalanceInfo />
          </Grid>
        </Grid>
        <Grid size={{xs:12}}>
          <LeaveRequestModule />
        </Grid>
        
      </Grid>
  );
}