import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useEmployeeAttendance } from '../../contexts/EmployeeAttendanceProvider'
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';

const AttendanceSummary = () => {

  const {attendanceReport} = useEmployeeAttendance();
  const [summary, setSummary] = useState({});
  const [weeklyReport, setWeeklyReport] = useState({});
  const [monthlyReport, setMonthlyReport] = useState({});
  const [yearlyReport, setYearlyReport] = useState({})
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!attendanceReport) return;
    setSummary(attendanceReport.attendanceReportSummary)
  },[attendanceReport])

  useEffect(()=>{
    if(!attendanceReport) return;
    setWeeklyReport(summary[0])
    setMonthlyReport(summary[1])
    setYearlyReport(summary[3])
  },[summary])

  useEffect(()=>{
    setData([
      {
        label: `Weekly Attendance Percentage`,
        value: weeklyReport?.percentage,
        icon: CalendarMonthIcon,
        color: "Teal"
      },
      {
        label: `Monthly Attendance Percentage`,
        value: monthlyReport?.percentage,
        icon: CalendarTodayIcon,
        color: "CadetBlue"
      },
      {
        label: `Yearly Attendance Percentage`,
        value: yearlyReport?.percentage,
        icon: AssessmentIcon,
        color: "ForestGreen"
      },
      {
        label: `Weekly Average Workhour`,
        value: weeklyReport?.averageWorkHour,
        icon: TimelineIcon,
        color: "DarkSlateBlue"
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
        <Paper variant='outlined' sx={{borderColor: d.color}}>
          <d.icon sx={{color: d.color}} />
          <Typography sx={{color: d.color}} >{d.label}</Typography>
          <Typography variant='h6' sx={{color: d.color}} >{d.value}</Typography>
      </Paper>
      ))}
    </Box>
    </Paper>
  )
}

export default AttendanceSummary