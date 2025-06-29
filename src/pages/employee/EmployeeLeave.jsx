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


export default function EmployeeLeave() {

  const [modalOpen, setModalOpen] = useState(false)

  return (<Box sx={{
      display: "grid",
      gap: "2em",
    }}>
        <Box  sx={{display: "grid", gridTemplateColumns:"1fr auto", gap: 4}}>
          <LeaveBalanceModule />
          <LeaveBalanceInfo />
        </Box>
        <LeaveRequestModule />
        
      </Box>
  );
}