import { Paper } from '@mui/material'
import React from 'react'
import AttendanceWeeklyReport from './AttendanceWeeklyReport'
import AttendanceMonthlyReport from './AttendanceMonthlyReport'

const AttendanceReportInfo = () => {
  return (
    <Paper sx ={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      gap: 4
    }}>
      <AttendanceWeeklyReport label="This Week Report" />
      <AttendanceWeeklyReport label ="Last Week Report" />
      <AttendanceMonthlyReport label ="This Month Report"/>
      <AttendanceMonthlyReport label ="Last Month Report"/>
    </Paper>
  )
}

export default AttendanceReportInfo