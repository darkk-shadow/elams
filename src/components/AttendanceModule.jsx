import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const AttendanceModule = () => {
  return (
    <Paper>
        <Typography>View Attendance Repost:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
        </LocalizationProvider>
    </Paper>
  )
}

export default AttendanceModule