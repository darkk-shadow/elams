import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Paper, Button, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider';
import AttendanceDay from '../employeeAttendance/AttendanceDay';
import { useNavigate } from 'react-router-dom';
import AttendanceCalendar from '../employeeAttendance/AttendanceCalendar';


export default function AttendanceModule() {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Button sx={{ gap: 1 }} onClick={() => navigate("/attendanceManagement")}>
        Attendance Report <LaunchIcon fontSize='small' />
      </Button>
      <AttendanceCalendar/>
    </Paper>
  );
}