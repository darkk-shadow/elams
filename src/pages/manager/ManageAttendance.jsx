import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AttendanceReport from '../../components/managerDashboard/AttendanceReport';
import AttendanceTable from '../../components/manageAttendance/AttendanceTable';
import SummaryCards from '../../components/manageAttendance/SummaryCards';
import EmployeeStatisticsPieChart from '../../components/manageAttendance/EmployeeStatisticsPieChart';
import WeeklyWorkHoursBarChart from '../../components/manageAttendance/WeeklyWorkHoursBarChart';
import AttendanceCalendar from '../../components/manageAttendance/AttendanceCalendar';
import { useManagerAttendance } from '../../contexts/ManagerAttendanceProvider';
import { useManager } from '../../contexts/ManagerProvider';

// Summary cards for employee stats


// Attendance table for employee details

const ManageAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'];
  const attendancePercent = [80, 90, 75, 85, 95]; // Example data
  const avgWorkHours = [7, 8, 9, 10, 12]; // Dummy data for average work hours
  const {noTappedIn, onLeave} = useManagerAttendance();
  const {teamCount} = useManager();

  // Pie chart data for employee statistics
  const pieChartData = [
    { id: 0, value: noTappedIn, label: 'Present', color: '#4caf50' },
    { id: 1, value: teamCount-noTappedIn, label: 'Absent', color: '#f44336' },
    { id: 2, value: onLeave, label: 'Leave', color: '#ffb300' },
  ];

  return (
    <Box sx={{display: "grid", gap: 4 }}>
      <SummaryCards />

      <Typography variant='h6'>Attendance Statistics</Typography>

      <Box sx={{display: "grid", gap: 8, gridAutoFlow: "column"}}>


          <Paper>
            <Typography>Calendar View</Typography>
            <AttendanceCalendar />
          </Paper>
          
          <AttendanceReport />
            
          <EmployeeStatisticsPieChart data={pieChartData} />
          {/* <WeeklyWorkHoursBarChart weekDays={weekDays} avgWorkHours={avgWorkHours} /> */}

      </Box>
          
      <AttendanceTable />
    </Box>
  );
};

export default ManageAttendance;
