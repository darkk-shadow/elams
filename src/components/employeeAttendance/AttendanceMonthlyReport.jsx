import { Paper, Typography } from '@mui/material'
import React from 'react'

const AttendanceMonthlyReport = ({label}) => {
  return (
    <Paper variant='outlined'>
      <Typography textAlign="center">{label}</Typography>
    </Paper>
  )
}

export default AttendanceMonthlyReport