import React, { useContext } from 'react'
import AttendanceCalendar from '../../components/employeeAttendance/AttendanceCalendar'
import { Box, Card, Paper, Typography } from '@mui/material'

const EmployeeAttendanceReport = () => {

  return (
    <Box sx={{display: "grid", gridTemplateColumns: "1fr 3fr"}}>
      <Paper>
        <Typography variant='h5' textAlign="center">Attendance Report Calendar</Typography>
        <AttendanceCalendar />
      </Paper>
      <Box>

      </Box>
    </Box>

  )
}

export default EmployeeAttendanceReport