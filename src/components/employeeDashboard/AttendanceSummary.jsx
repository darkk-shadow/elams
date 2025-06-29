import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider'
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';

const AttendanceSummary = () => {

  const {attendanceReport} = useEmployeeAttendance();
  const [summary, setSummary] = useState({});
  const [weeklyReport, setWeeklyReport] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
  const [yearlyReport, setYearlyReport] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    if(!attendanceReport) return;
    setSummary(attendanceReport.attendanceReportSummary)
  },[attendanceReport])

  useEffect(()=>{
    setWeeklyReport(summary[0])
    setMonthlyReport(summary[1])
    setYearlyReport(summary[2])
  },[summary])

  return (
    <Paper sx={{display: "grid", gridTemplateRows: "auto 1fr", gap: 4}}>
      <Button sx={{ gap: 1, justifySelf: "start"}} onClick={() => navigate("/attendanceManagement")}>
        Attendance Summary <LaunchIcon fontSize='small' />
      </Button>
    <Box sx={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr", gap: 4
    }}>
      <Card variant='outlined'>
        <Typography>Weekly Attendance Percentage</Typography>
        <Typography>{weeklyReport?.percentage}</Typography>
      </Card>
      <Card variant='outlined'>
        <Typography>Weekly Attendance Percentage</Typography>
        <Typography>{monthlyReport?.percentage}</Typography>
      </Card>
      <Card variant='outlined'>
        <Typography>Weekly Attendance Percentage</Typography>
        <Typography>{yearlyReport?.percentage}</Typography>
      </Card>
      <Card variant='outlined'>
        <Typography>Weekly Average Workhour</Typography>
        <Typography>{weeklyReport?.averageWorkHour}</Typography>
      </Card>
    </Box>
    </Paper>
  )
}

export default AttendanceSummary