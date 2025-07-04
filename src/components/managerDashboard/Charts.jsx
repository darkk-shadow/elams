import { Box, Grid } from '@mui/material'
import React from 'react'
import ShiftChart from './ShiftChart'
import LeaveDistribution from './LeaveDistribution'
import AttendanceReport from './AttendanceReport'

const Charts = () => {
  return (
    <Grid container spacing={4} justifyContent="space-around">
      <ShiftChart />
      <LeaveDistribution />
      <AttendanceReport />
    </Grid>
  )
}

export default Charts