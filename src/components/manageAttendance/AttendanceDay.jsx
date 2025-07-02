import * as React from 'react';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider';
import { Button, Tooltip } from '@mui/material';
import AttendanceDayInfo from './AttendanceDayInfo';

const AttendanceDay = (props) => {
  const { day, attendanceReports, outsideCurrentMonth, ...other } = props;

  const [attendance, setAttendance] = React.useState({});
  const [styles, setStyles] = React.useState({})
  const [isAbsent, setIsAbsent] = React.useState(false)

  const isWeekEnd = day.format("ddd") == "Sat" || day.format("ddd") == "Sun";
  const isOutOfBound = day.isBefore(new Date("2025-01-01")) || day.isAfter(new Date());

  const markLabels = {
    PRESENT: 'Present',
    ABSENT: 'Absent',
    HALF_DAY: 'Half Day',
    HOLIDAY: 'Holiday',
    ABNORMAL: "Abnormal"
  }

  const markColors = {
    PRESENT: 'lightgreen',
    ABSENT: 'lightcoral',
    HALF_DAY: 'yellow',
    HOLIDAY: 'Holiday',
    ABNORMAL: "salmon"
  }
  

  React.useEffect(()=>{
    let date = day.format("YYYY-MM-DD");
    if(attendanceReports.length>0)
    setAttendance(attendanceReports.find(a => a.date==date))
  },[attendanceReports])

  React.useEffect(()=>{
    if(isWeekEnd || isOutOfBound){
      return;
    }
    if(!attendance) {
      
      setIsAbsent(true)

      setStyles({
        pickerDays: {
          backgroundColor: 'lightcoral',
          color: 'black',
          '&:hover': {
            backgroundColor: 'firebrick',
            color: 'white',
          },
        },
      })
      return;
    }

    setStyles({
      pickerDays: {
        ...(attendance.status == "ABNORMAL" && {
          backgroundColor: 'secondary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'darkred',
          },
        }),
        ...(attendance.status == "PRESENT" && {
          backgroundColor: 'lightgreen', 
          color: 'black',
          '&:hover': {
            backgroundColor: 'darkgreen',
            color: 'white',
          },
        }),
        ...(attendance.status == "HALF_DAY" && {
          backgroundColor: 'yellow', 
          color: 'black',
          '&:hover': {
            backgroundColor: 'darkgreen',
            color: 'white',
          },
        }),
        ...(attendance.status == "ABSENT" && {
          backgroundColor: 'lightcoral',
          color: 'black',
          '&:hover': {
            backgroundColor: 'firebrick',
            color: 'white',
          },
        }),
      }}
    )
  }, [attendance])

  return (
    <Tooltip title={<AttendanceDayInfo attendance={attendance} isAbsent={isAbsent} isWeekEnd={isWeekEnd} />} >
      <PickersDay onClick={()=>{console.log(day, attendance)}}
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={styles.pickerDays}
      />
    </Tooltip>
  );
};



export default AttendanceDay;