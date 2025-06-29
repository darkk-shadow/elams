import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Paper, Button, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider';

const highlightDates = {
  holidays: [1, 3, 4, 6, 7],
  presents: [12, 13, 24],
  absent: [15, 17],
};


const CustomDay = (props) => {
  const { day, outsideCurrentMonth, highlightData, ...other } = props;

  const dayNumber = day.date();
  const month = day.month(); 
  const year = day.year();

  const isHoliday = !outsideCurrentMonth && highlightData.holidays.includes(dayNumber);
  const isPresent = !outsideCurrentMonth && highlightData.presents.includes(dayNumber);
  const isAbsent = !outsideCurrentMonth && highlightData.absent.includes(dayNumber);

  const styles = {
    pickerDays: {
      ...(isHoliday && {
        backgroundColor: 'salmon',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkred',
        },
      }),
      ...(isPresent && {
        backgroundColor: 'lightgreen', 
        color: 'black',
        '&:hover': {
          backgroundColor: 'darkgreen',
          color: 'white',
        },
      }),
      ...(isAbsent && {
        backgroundColor: 'lightcoral',
        color: 'black',
        '&:hover': {
          backgroundColor: 'firebrick',
          color: 'white',
        },
      }),
    }
  }

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={styles.pickerDays}
    />
  );
};

export default function CalendarWithHighlights() {
  const [value, setValue] = React.useState(dayjs());

  const {attendances} = useEmployeeAttendance();

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
            day: CustomDay,
          }}
          
          slotProps={{
            day: (ownerState) => ({
              highlightData: highlightDates,
            }),
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}