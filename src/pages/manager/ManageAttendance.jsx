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

// Summary cards for employee stats
const SummaryCards = () => (
  <Grid container spacing={2} justifyContent="center" alignContent="center" sx={{ my: 2, flexWrap: 'nowrap', maxWidth: 1200, mx: 'auto' }}>
    {[
      { label: 'Total', value: 50, icon: <PeopleIcon color="primary" />, color: 'primary.main' },
      { label: 'Present', value: 35, icon: <CheckCircleIcon sx={{ color: 'green' }} />, color: 'success.main' },
      { label: 'Absent', value: 10, icon: <CancelIcon sx={{ color: 'red' }} />, color: 'error.main' },
      { label: 'Leave', value: 5, icon: <BeachAccessIcon sx={{ color: 'gold' }} />, color: 'warning.main' },
      { label: 'Avg Hrs', value: 9, icon: <AccessTimeIcon sx={{ color: '#1976d2' }} />, color: 'info.main' },
    ].map((item, idx) => (
      <Grid item key={idx}>
        <Paper elevation={3} sx={{ p: 2, minWidth: 160, textAlign: 'center', height: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {item.icon}
            <Typography variant="subtitle1">{item.label}</Typography>
            <Typography variant="h5" sx={{ color: item.color }}>{item.value}</Typography>
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

// Attendance table for employee details
const getRandomDate = () => {
  const start = new Date(2025, 5, 1); // June 1, 2025
  const end = new Date(2025, 5, 27); // June 27, 2025
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const getRandomStatus = () => {
  const statuses = ['Present', 'Absent', 'On Leave'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomTime = () => {
  const hour = Math.floor(Math.random() * 3) + 8; // 8-10 AM
  const min = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

const getRandomWorkHours = () => {
  return (Math.random() * 4 + 4).toFixed(2); // 4-8 hours
};

const generateRows = (count = 7) => {
  return Array.from({ length: count }).map((_, idx) => {
    const status = getRandomStatus();
    return {
      id: `EMPID${(idx + 1).toString().padStart(3, '0')}`,
      date: getRandomDate(),
      clockIn: status === 'Present' || status === 'On Leave' ? getRandomTime() : '',
      clockOut: status === 'Present' || status === 'On Leave' ? getRandomTime() : '',
      hours: status === 'Present' || status === 'On Leave' ? getRandomWorkHours() : '',
      status,
    };
  });
};

const statusColorMap = {
  Present: 'success',
  Absent: 'error',
  'On Leave': 'warning',
  Leave: 'warning',
};
const statusLabelMap = {
  Present: 'Present',
  Absent: 'Absent',
  'On Leave': 'Leave',
  Leave: 'Leave',
};
const AttendanceTable = () => {
  const [rows] = useState(generateRows(7));
  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Clock In</TableCell>
              <TableCell>Clock Out</TableCell>
              <TableCell>Total Work Hours</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.clockIn}</TableCell>
                <TableCell>{row.clockOut}</TableCell>
                <TableCell>{row.hours}</TableCell>
                <TableCell>
                  <Chip
                    label={statusLabelMap[row.status]}
                    color={statusColorMap[row.status]}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                  <EditIcon fontSize="small" sx={{ ml: 1, cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

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
          <Paper sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 240, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 }}>Employee Statistics</Typography>
            <PieChart
              series={[{
                data: pieChartData,
                innerRadius: 40,
                outerRadius: 80,
                paddingAngle: 3,
                cornerRadius: 5,
                startAngle: 0,
                endAngle: 360,
              }]}
              width={180}
              height={180}
              legend={{ hidden: false }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', minWidth: 0 }}>
          <Paper sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 240, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            {/* <Typography variant="h6" sx={{ mb: 2 }}>Attendance Report</Typography> */}
            <AttendanceReport />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', minWidth: 0 }}>
          <Paper sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 240, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 }}>Average Work Hours (Weekly)</Typography>
            <BarChart
              xAxis={[{ data: weekDays, scaleType: 'band', label: 'Week Days' }]}
              series={[{ data: [6, 8, 9, 10, 12], color: '#4FC3F7', label: 'Avg Work Hours' }]}
              yAxis={[{ min: 6, label: 'Work Hours' }]}
              height={160}
              grid={null}
            />
          </Paper>
        </Grid>
      </Grid>
      <AttendanceTable />
    </Box>
  );
};

export default ManageAttendance;
