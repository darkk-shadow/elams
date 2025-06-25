import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import LaunchIcon from '@mui/icons-material/Launch';

const AttendanceModule = () => {
  return (
    <Paper>
        <Button sx={{gap:1}}>Attendance Report <LaunchIcon fontSize='small' /></Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
        </LocalizationProvider>
    </Paper>
  )
}

export default AttendanceModule