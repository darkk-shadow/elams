import * as React from 'react';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import AttendanceDayInfo from './AttendanceDayInfo';
import BootstrapTooltip from '../../util/BootStrapTooltip';

const AttendanceDay = (props) => {
  const { day, attendanceReports, outsideCurrentMonth, ...other } = props;

  // Find the report for this day
  const dateStr = day.format("YYYY-MM-DD");
  const [attendance, setAttendance] = React.useState();
  const [isAbsent, setIsAbsent] = React.useState(false);
  const [isWeekEnd, setIsWeekEnd] = React.useState(false);

  React.useEffect(() => {
    setIsWeekEnd(day.format("ddd") === "Sat" || day.format("ddd") === "Sun");
    const report = attendanceReports.find(r => r.date === dateStr);
    setAttendance(report);
    setIsAbsent(!report);
  }, [attendanceReports, day]);

  // Determine color based on percentage
  let color = undefined;
  if (attendance && typeof attendance.percentage === 'number') {
    if (attendance.percentage > 90) color = 'green';
    else if (attendance.percentage > 70) color = 'orange';
    else if (attendance.percentage > 50) color = 'yellow';
    else color = 'red';
  }

  return (
    <BootstrapTooltip title={<AttendanceDayInfo attendance={attendance} isAbsent={isAbsent} isWeekEnd={isWeekEnd} />}>
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={color ? { backgroundColor: color, color: 'white', '&:hover': { backgroundColor: color, opacity: 0.8 } } : {}}
      />
    </BootstrapTooltip>
  );
};

export default AttendanceDay;