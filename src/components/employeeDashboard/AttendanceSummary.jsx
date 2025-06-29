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
  const [data, setData] = useState();
  const navigate = useNavigate()

  useEffect(()=>{
    if(!attendanceReport) return;
    setSummary(attendanceReport.attendanceReportSummary)
  },[attendanceReport])

  useEffect(()=>{
    if(!attendanceReport) return;
    setWeeklyReport(summary[0])
    setMonthlyReport(summary[1])
    setYearlyReport(summary[4])
  },[summary])

  useEffect(()=>{
    setData([
      {
        label: `Weekly Attendance Percentage`,
        value: weeklyReport?.percentage,
      },
      {
        label: `Monthlu Attendance Percentage`,
        value: monthlyReport?.percentage,
      },
      {
        label: `Yearly Attendance Percentage`,
        value: yearlyReport?.percentage,
      },
      {
        label: `Weekly Average Workhour`,
        value: weeklyReport?.averageWorkHour,
      },
    ])
  },[yearlyReport])

  return (
    <Paper sx={{display: "grid", gridTemplateRows: "auto 1fr", gap: 4}}>
      <Button sx={{ gap: 1, justifySelf: "start"}} onClick={() => navigate("/attendanceManagement")}>
        Attendance Summary <LaunchIcon fontSize='small' />
      </Button>
    <Box sx={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr", gap: 4
    }}>
      {data.map(d => (
        <Card variant='outlined'>
          <Typography>{d.label}</Typography>
          <Typography>{d.value}</Typography>
      </Card>
      ))}
    </Box>
    </Paper>
  )
}

export default AttendanceSummary