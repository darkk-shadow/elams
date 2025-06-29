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

const highlightDates = {
  holidays: [1, 3, 4, 6, 7],
  presents: [12, 13, 24],
  absent: [15, 17],
};




export default function AttendanceModule() {
  const [value, setValue] = React.useState(dayjs());

  

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Button sx={{ gap: 1 }} onClick={() => console.log("Navigate to attendance management")}>
        Attendance Report <LaunchIcon fontSize='small' />
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          
          slots={{
            day: AttendanceDay,
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}