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
    <Box sx={{display: "grid", gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <TextField
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
        /> */}
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

      <Box sx={{display: "grid", placeContent: "space-around", gridAutoFlow: "column"}}>

          <EmployeeStatisticsPieChart data={pieChartData} />
          
          <AttendanceReport />
            
          <WeeklyWorkHoursBarChart weekDays={weekDays} avgWorkHours={avgWorkHours} />

      </Box>
      
          
          
      <AttendanceTable />
    </Box>
  );
};

export default ManageAttendance;
