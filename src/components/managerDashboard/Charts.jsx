import { Box, Grid } from '@mui/material'
import React from 'react'
import ShiftChart from './ShiftChart'
import LeaveDistribution from './LeaveDistribution'
import AttendanceReport from './AttendanceReport'
import useIsMobile from '../../util/useMobile'

const Charts = () => {

  const size = {xs: 12, md: 4}

  return (
    <Grid container spacing={4} justifyContent="space-around">
      <Grid size={size}>
        <ShiftChart />
      </Grid>
      <Grid size={size}>
        <LeaveDistribution />
      </Grid>
      <Grid size={size}>
        <AttendanceReport />
      </Grid>
    </Grid>
  )
}

export default Charts