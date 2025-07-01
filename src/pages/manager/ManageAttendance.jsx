import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import Charts from '../../components/managerDashboard/Charts';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { PieChart } from '@mui/x-charts/PieChart';
import AttendanceReport from '../../components/managerDashboard/AttendanceReport';
import AttendanceTable from '../../components/manageAttendance/AttendanceTable';
import SummaryCards from '../../components/manageAttendance/SummaryCards';
import EmployeeStatisticsPieChart from '../../components/manageAttendance/EmployeeStatisticsPieChart';
import WeeklyWorkHoursBarChart from '../../components/manageAttendance/WeeklyWorkHoursBarChart';

// Summary cards for employee stats


// Attendance table for employee details

const ManageAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'];
  const attendancePercent = [80, 90, 75, 85, 95]; // Example data
  const avgWorkHours = [7, 8, 9, 10, 12]; // Dummy data for average work hours

  // Pie chart data for employee statistics
  const pieChartData = [
    { id: 0, value: 35, label: 'Present', color: '#4caf50' },
    { id: 1, value: 10, label: 'Absent', color: '#f44336' },
    { id: 2, value: 5, label: 'Leave', color: '#ffb300' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 2, mr: 2, maxWidth: 1200, mx: 'auto' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search employee..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ width: 320, background: '#e0e0e0', borderRadius: 2, pr: 0 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ minWidth: 36, height: 32, p: 0, borderRadius: 2, background: '#1976d2', boxShadow: 'none', '&:hover': { background: '#1565c0' } }}
                >
                  <SearchIcon sx={{ color: 'white' }} />
                </Button>
              </InputAdornment>
            ),
            style: { borderRadius: 8, background: '#e0e0e0' }
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <Button variant="outlined" {...params} />}
            />
          </LocalizationProvider>
          <Button variant="contained">Report</Button>
        </Box>
      </Box>
      <SummaryCards />
      <Grid container spacing={2} sx={{ mt: 2, alignItems: 'stretch', justifyContent: 'center', flexWrap: 'nowrap', maxWidth: 1200, mx: 'auto' }}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', minWidth: 0 }}>
          <EmployeeStatisticsPieChart data={pieChartData} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', minWidth: 0 }}>
          <Paper sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 240, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            {/* <Typography variant="h6" sx={{ mb: 2 }}>Attendance Report</Typography> */}
            <AttendanceReport />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', minWidth: 0 }}>
          <WeeklyWorkHoursBarChart weekDays={weekDays} avgWorkHours={avgWorkHours} />
        </Grid>
      </Grid>
      <AttendanceTable />
    </Box>
  );
};

export default ManageAttendance;
