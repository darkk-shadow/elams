import React, { useContext } from 'react'
import AttendanceCalendar from '../../components/employeeAttendance/AttendanceCalendar'
import { Box, Card, Paper, Typography } from '@mui/material'
import CalendarLegend from '../../components/employeeAttendance/CalenderLegend'

const markLabels = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  HALF_DAY: 'Half Day',
  ABNORMAL: "Abnormal"
}

const markColors = {
  PRESENT: 'lightgreen',
  ABSENT: 'lightcoral',
  HALF_DAY: 'yellow',
  ABNORMAL: "secondary.main"
}

const EmployeeAttendanceReport = () => {

  return (
    <Box sx={{display: "grid", gridTemplateColumns: "1fr 3fr"}}>
      <Paper>
        <Typography variant='h5' textAlign="center">Attendance Report Calendar</Typography>
        <AttendanceCalendar />
        <CalendarLegend markColors={markColors} markLabels={markLabels} />
      </Paper>
      <Box>
        
      </Box>
    </Box>

  )
}

export default EmployeeAttendanceReport