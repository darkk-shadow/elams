import React, { useContext } from 'react'
import AttendanceCalendar from '../../components/employeeAttendance/AttendanceCalendar'
import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import CalendarLegend from '../../components/employeeAttendance/CalenderLegend'
import AttendanceReportInfo from '../../components/employeeAttendance/AttendanceReportInfo'

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
    <Grid container spacing={4}>
      <Grid size={{xs: 12, lg: 4}}>
        <Paper>
          <Typography variant='h5' textAlign="center">Attendance Report Calendar</Typography>
          <AttendanceCalendar />
          <CalendarLegend markColors={markColors} markLabels={markLabels} />
        </Paper>
      </Grid>
      <Grid container spacing={4} size={{xs: 12, lg: 8}}>
        <AttendanceReportInfo />
      </Grid>
    </Grid>

  )
}

export default EmployeeAttendanceReport