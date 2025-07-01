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


const SummaryCards = () => (
  <Box sx={{
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
        placeContent: "space-around", gridAutoFlow: "column",
        gap: "10%"
      }}>
    {[
      { label: 'Total', value: 50, icon: <PeopleIcon color="primary" />, color: 'primary.main' },
      { label: 'Present', value: 35, icon: <CheckCircleIcon sx={{ color: 'green' }} />, color: 'success.main' },
      { label: 'Absent', value: 10, icon: <CancelIcon sx={{ color: 'red' }} />, color: 'error.main' },
      { label: 'Leave', value: 5, icon: <BeachAccessIcon sx={{ color: 'gold' }} />, color: 'warning.main' },
      { label: 'Avg Hrs', value: 9, icon: <AccessTimeIcon sx={{ color: '#1976d2' }} />, color: 'info.main' },
    ].map((item, idx) => (
        <Paper sx={{display: "grid", placeItems: "center"}} >
            {item.icon}
            <Typography variant="subtitle1">{item.label}</Typography>
            <Typography variant="h5" sx={{ color: item.color }}>{item.value}</Typography>
        </Paper>
    ))}
  </Box>
);

export default SummaryCards;