import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const AttendanceMonthlyReport = ({label, report}) => {

  const [data, setData] = useState([])

  useEffect(()=>{
    if(!report) return;
    console.log(report)
    setData([
      {label: "Average working hours", value: report.averageWorkHour},
      {label: "Total present", value: report.totalPresent},
      {label: "Total absent", value: report.totalAbsent},
      {label: "Attendance Percentage", value: `${report.percentage}%`},
    ])  

  },[report])

  return (
    <Paper variant='outlined' sx={{display: "grid", gap: 2}}>
      <Typography textAlign="center">{label}</Typography>
      <Box>
        {data.map(d => (
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            justifyContent: "space-between"
          }}>
            {console.log(data)}
            <Typography>{d.label}</Typography>
            <Typography>: {d.value}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default AttendanceMonthlyReport