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

  const charts = [
    {
      title: "Calendar View",
      comp: <AttendanceCalendar />,
    },
    {
      title: "Attendance Report",
      comp: <AttendanceReport />,
    },
    {
      title: "Employee Statistics",
      comp: <EmployeeStatisticsPieChart data={pieChartData} />,
    }
  ]

  return (
    <Grid container spacing={8}>
      <Grid size={{xs: 12}}>
        <SummaryCards />
      </Grid> 


      <Grid container spacing={8} size={{xs: 12}}>
        <Grid size={{xs:12}}>
          <Typography textAlign="center" variant='h5'>Attendance Summary</Typography>
        </Grid>
        {charts.map(e => (
          <Grid size={{xs: 12, lg:4}}>
          <Paper sx={{height: "100%"}}>
            <Typography variant='h6'>{e.title}</Typography>
            {e.comp}
          </Paper>
        </Grid>
        ))}

      </Grid>
          
      <Grid size={{xs: 12}}>
        <Paper>
            <Typography variant='h6'>Attendance Reports</Typography>
          <AttendanceTable />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ManageAttendance;
