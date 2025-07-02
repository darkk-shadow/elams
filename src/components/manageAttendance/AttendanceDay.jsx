import * as React from 'react';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Tooltip } from '@mui/material';

const AttendanceDay = (props) => {
  const { day, attendanceReports, outsideCurrentMonth, ...other } = props;

  // Find the report for this day
  const dateStr = day.format("YYYY-MM-DD");
  const report = attendanceReports.find(r => r.date === dateStr);

  // Determine color based on percentage
  let color = undefined;
  if (report && typeof report.percentage === 'number') {
    if (report.percentage > 90) color = 'green';
    else if (report.percentage > 70) color = 'orange';
    else if (report.percentage > 50) color = 'yellow';
    else color = 'red';
  }

  return (
    <Tooltip title={report ? `${report.percentage}% present` : "No data"}>
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={color ? { backgroundColor: color, color: 'white', '&:hover': { backgroundColor: color, opacity: 0.8 } } : {}}
      />
    </Tooltip>
  );
};

export default AttendanceDay;