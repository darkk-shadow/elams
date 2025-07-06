import { Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AttendanceWeeklyReport from './AttendanceWeeklyReport'
import AttendanceMonthlyReport from './AttendanceMonthlyReport'
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider'

const AttendanceReportInfo = () => {

  const [attendanceReportSummary, setAttendanceReportSummary] = useState()
  const [currentMonthlyReport, setCurrentMonthlyReport] = useState()
  const [currentWeeklyReport, setCurrentWeeklyReport] = useState()
  const [lastFullMonthlyReport, setLastFullMonthlyReport] = useState()
  const [lastFullWeeklyReport, setLastFullWeeklyReport] = useState()
  const [yearlyReport, setYearlyReport] = useState()

  const [summary, setSummary] = useState({});

  const {attendanceReport} = useEmployeeAttendance()

  useEffect(()=>{
      if(!attendanceReport) return;
      setSummary(attendanceReport.attendanceReportSummary)
    },[attendanceReport])

  useEffect(()=>{
    if(!attendanceReport) return;
    setAttendanceReportSummary(attendanceReport.attendanceReportSummary)
    setCurrentMonthlyReport(attendanceReport.currentMonthlyReport)
    setCurrentWeeklyReport(attendanceReport.currentWeeklyReport)
    setLastFullMonthlyReport(attendanceReport.lastFullMonthlyReport)
    setLastFullWeeklyReport(attendanceReport.lastFullWeeklyReport)
    setYearlyReport(attendanceReport.yearlyReport)

  },[attendanceReport])

  const comps = [
    <AttendanceWeeklyReport label="This Week Report" report={currentWeeklyReport}/>,
    <AttendanceWeeklyReport label ="Last Week Report" report={lastFullWeeklyReport} />,
    <AttendanceMonthlyReport label ="This Month Report" report={summary[1]}/>,
    <AttendanceMonthlyReport label ="Last Month Report" report={summary[3]} />,
  ]

  return (
    <Paper>
      <Grid container spacing={4}>
        {comps.map(c=> (
          <Grid size={{xs: 12, md: 6}} >
            {c}
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default AttendanceReportInfo