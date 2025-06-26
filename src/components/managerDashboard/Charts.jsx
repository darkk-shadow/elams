import { Box } from '@mui/material'
import React from 'react'
import ShiftChart from './ShiftChart'
import LeaveDistribution from './LeaveDistribution'
import AttendanceReport from './AttendanceReport'

const Charts = () => {
  return (
    <Box sx={{
      display: "grid",
      gap: 4,
      gridTemplateColumns: "auto auto auto"
    }}>
      <ShiftChart />
      <LeaveDistribution />
      <AttendanceReport />
    </Box>
  )
}

export default Charts