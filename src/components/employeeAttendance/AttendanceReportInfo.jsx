import { Paper } from '@mui/material'
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

  return (
    <Paper sx ={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr auto",
      gap: 4
    }}>
      <AttendanceWeeklyReport label="This Week Report" report={currentWeeklyReport}/>
      <AttendanceWeeklyReport label ="Last Week Report" report={lastFullMonthlyReport} />
      <AttendanceMonthlyReport label ="This Month Report" report={currentMonthlyReport}/>
      <AttendanceMonthlyReport label ="Last Month Report" report={lastFullMonthlyReport} />
    </Paper>
  )
}

export default AttendanceReportInfo